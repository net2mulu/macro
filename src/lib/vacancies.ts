const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.macrogc.com').replace(/\/$/, '')
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''

export type Vacancy = {
  id: number
  documentId?: string
  title: string
  description: string
  employmentType?: string
  location?: string
  salaryMin?: number
  salaryMax?: number
  status?: string
  postedAt?: string
  deadline?: string
}

export type VacancyListResponse = {
  data: Vacancy[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

type StrapiVacancy = {
  id: number
  documentId?: string
  attributes?: Record<string, any>
  // Flat fallbacks (some Strapi endpoints return flattened payloads)
  title?: string
  description?: any
  employment_type?: string
  location?: string
  salary_min?: number
  salary_max?: number
  status?: string
  posted_at?: string
  deadline?: string
}

export type VacancyApplicationPayload = {
  vacancy: number
  full_name: string
  birth_date?: string
  sex?: 'male' | 'female' | 'other'
  place_of_birth?: string
  nationality: string
  education_background?: string
  short_courses?: string
  work_history?: string
  current_address?: string
  sub_city?: string
  woreda?: string
  phone_number: string
  email: string
  reference_1?: string
  reference_2?: string
  reference_3?: string
}

const headers: HeadersInit = (() => {
  const base: HeadersInit = { 'Content-Type': 'application/json' }
  if (STRAPI_API_TOKEN) {
    base['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }
  return base
})()

const flattenDescription = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((block: any) => {
        if (typeof block === 'string') return block
        if (block?.children && Array.isArray(block.children)) {
          return block.children
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((child: any) => child?.text)
            .filter(Boolean)
            .join('')
        }
        return block?.text || ''
      })
      .filter(Boolean)
      .join('\n\n')
  }
  return ''
}

const normalizeVacancy = (item: StrapiVacancy): Vacancy => {
  const attr = item.attributes || item
  return {
    id: Number(item.id),
    documentId: item.documentId,
    title: attr.title || '',
    description: flattenDescription(attr.description) || 'No description available.',
    employmentType: attr.employment_type || attr.employmentType,
    location: attr.location,
    salaryMin: attr.salary_min ?? attr.salaryMin,
    salaryMax: attr.salary_max ?? attr.salaryMax,
    status: attr.status,
    postedAt: attr.posted_at || attr.postedAt,
    deadline: attr.deadline,
  }
}

export async function fetchVacancies(page = 1, pageSize = 9): Promise<VacancyListResponse> {
  const url = `${STRAPI_URL}/api/vacancies?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=posted_at:desc`

  const response = await fetch(url, { headers, cache: 'no-store' })
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Failed to fetch vacancies: ${response.status} ${response.statusText} ${body}`)
  }

  const json = await response.json()
  const mapped = Array.isArray(json.data) ? json.data.map((item: StrapiVacancy) => normalizeVacancy(item)) : []
  return { data: mapped, meta: json.meta }
}

export async function fetchVacancyByIdentifier(identifier: string): Promise<Vacancy> {
  // Use Strapi best-practice queries:
  // - If the identifier is numeric, hit /api/vacancies/:id directly.
  // - If not numeric, filter by documentId only (avoid casting error on id integer column).
  const trimmed = identifier.trim()
  const isNumericId = /^\d+$/.test(trimmed)

  if (isNumericId) {
    const directUrl = `${STRAPI_URL}/api/vacancies/${encodeURIComponent(trimmed)}`
    const directRes = await fetch(directUrl, { headers, cache: 'no-store' })
    if (!directRes.ok) {
      const body = await directRes.text().catch(() => '')
      throw new Error(`Failed to fetch vacancy: ${directRes.status} ${directRes.statusText} ${body}`)
    }
    const json = await directRes.json()
    if (!json?.data) throw new Error('Vacancy not found')
    return normalizeVacancy(json.data as StrapiVacancy)
  }

  // Non-numeric -> filter on documentId only to avoid integer cast errors
  const filterUrl = `${STRAPI_URL}/api/vacancies?filters[documentId][$eq]=${encodeURIComponent(trimmed)}&pagination[pageSize]=1`
  const response = await fetch(filterUrl, { headers, cache: 'no-store' })
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Failed to fetch vacancy: ${response.status} ${response.statusText} ${body}`)
  }

  const json = await response.json()
  const first = json?.data?.[0]
  if (!first) {
    throw new Error('Vacancy not found')
  }
  return normalizeVacancy(first as StrapiVacancy)
}

export async function submitVacancyApplication(payload: VacancyApplicationPayload): Promise<void> {
  const url = `${STRAPI_URL}/api/vacancy-applications`
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: payload }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Failed to submit application: ${response.status} ${response.statusText} ${body}`)
  }
}
