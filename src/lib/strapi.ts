// Strapi API configuration and utilities

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.macrogc.com').replace(/\/$/, '')
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''

export interface StrapiProject {
  id: number
  documentId?: string
  attributes?: {
    title: string
    description: string
    fullDescription?: string
    location: string
    client: string
    date: string
    tags?: string[]
    category?: any
    image?: { data?: { attributes: { url: string } } }
    mainImage?: { data?: { attributes: { url: string } } }
    status: string
    startingPoint?: string
    endingPoint?: string
    gridImages?: { data?: Array<{ attributes: { url: string } }> }
    slug: string
    contract?: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  // flat fallbacks
  title?: string
  description?: string
  fullDescription?: string
  location?: string
  client?: string
  date?: string
  tags?: string[]
  category?: any
  image?: { data?: { attributes: { url: string } } }
  mainImage?: { data?: { attributes: { url: string } } }
  status?: string
  startingPoint?: string
  endingPoint?: string
  gridImages?: { data?: Array<{ attributes: { url: string } }> } | string[]
  slug?: string
  contract?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface StrapiCategory {
  id: number
  documentId?: string
  attributes?: {
    name: string
    slug: string
  }
  name?: string
  slug?: string
}

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Helper function to get image URL from Strapi
export function getStrapiImageUrl(image: any): string {
  if (!image) return '/background/1.png'
  // string URL
  if (typeof image === 'string') {
    return image.startsWith('http') ? image : `${STRAPI_URL}${image}`
  }
  const url = image?.data?.attributes?.url || image?.url
  if (!url) return '/background/1.png'
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

// Helper function to get multiple image URLs
export function getStrapiImageUrls(images: any): string[] {
  if (!images) return []
  if (Array.isArray(images) && typeof images[0] === 'string') {
    return images.map((u) => getStrapiImageUrl(u))
  }
  if (images?.data && Array.isArray(images.data)) {
    return images.data.map((img: any) => getStrapiImageUrl({ data: img }))
  }
  return []
}

// Transform Strapi project to frontend format
export function transformProject(strapiProject: StrapiProject) {
  const attr = strapiProject.attributes || strapiProject
  const categoryRaw =
    attr?.category?.data?.attributes?.name ??
    attr?.category?.name ??
    (typeof attr?.category === 'string' ? attr.category : undefined) ??
    (attr?.category as any)?.attributes?.name
  const categoryName =
    (typeof categoryRaw === 'string' ? categoryRaw.trim() : '') ||
    ''

  const tagsRaw = (() => {
    if (Array.isArray((attr as any)?.tags?.data)) {
      return (attr as any).tags.data.map((t: any) => t?.attributes?.name).filter(Boolean)
    }
    if (Array.isArray((attr as any)?.tags)) {
      return (attr as any).tags.map((t: any) => (typeof t === 'string' ? t : t?.name)).filter(Boolean)
    }
    return []
  })()

  return {
    id: attr.slug || strapiProject.documentId || `project-${strapiProject.id}`,
    slug: attr.slug || strapiProject.documentId || strapiProject.id?.toString?.(),
    title: attr.title,
    description: attr.description,
    fullDescription: attr.fullDescription || attr.description,
    location: attr.location?.trim?.() || 'Unknown',
    client: attr.client,
    date: attr.date,
    tags: tagsRaw,
    category: categoryName,
    image: getStrapiImageUrl(attr.mainImage || attr.image),
    status: attr.status,
    startingPoint: attr.startingPoint,
    endingPoint: attr.endingPoint,
    gridImages: getStrapiImageUrls(attr.gridImages),
    contract: attr.contract,
  }
}

// Fetch all projects from Strapi
export async function fetchProjects(): Promise<StrapiResponse<StrapiProject[]>> {
  const url = `${STRAPI_URL}/api/projects?populate=*`
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`

  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`)
  }
  return response.json()
}

// Fetch a single project by slug/id/documentId
export async function fetchProjectBySlug(slug: string): Promise<StrapiResponse<StrapiProject>> {
  const safeSlug = encodeURIComponent(slug)
  const url = `${STRAPI_URL}/api/projects?filters[$or][0][slug][$eq]=${safeSlug}&filters[$or][1][documentId][$eq]=${safeSlug}&filters[$or][2][id][$eq]=${safeSlug}&populate=*`
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`

  const response = await fetch(url, { headers, cache: 'no-store' })
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Failed to fetch project: ${response.status} ${response.statusText} ${body}`)
  }

  const data = await response.json()
  if (!data.data || data.data.length === 0) {
    throw new Error(`Project with slug "${slug}" not found`)
  }

  return {
    data: data.data[0],
    meta: data.meta,
  }
}

// Fetch categories for tabs
export async function fetchCategories(): Promise<StrapiResponse<StrapiCategory[]>> {
  const url = `${STRAPI_URL}/api/categories?sort=name:asc`
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`

  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }

  return response.json()
}
