// import { BaseProject, ProjectDetail, TeamMember, StrapiContentBlock } from './interfaces'

// // --- CONFIGURATION ---
// // Default to live Strapi; trim trailing slash to avoid double "//"
// const API_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.macrogc.com').replace(/\/$/, '')

// // --- UTILITY TYPES ---
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type StrapiDataItem<T> = {
//   id: number
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   attributes: Record<string, any>
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type StrapiListResponse<T> = { data: StrapiDataItem<T>[] }

// // --- CORE FETCH HELPER ---
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// async function fetchStrapiData(path: string): Promise<any> {
//   const fullUrl = `${API_URL}${path}`

//   const headers = {
//     'Content-Type': 'application/json',
//   }

//   const response = await fetch(fullUrl, {
//     method: 'GET',
//     headers,
//     cache: 'no-store',
//   })

//   if (!response.ok) {
//     const errorBody = await response.text()
//     console.error(`Strapi API Error: ${response.status} ${response.statusText}`, errorBody)
//     throw new Error(`Failed to fetch from Strapi: ${response.statusText}. Check API URL: ${fullUrl}`)
//   }

//   return response.json()
// }

// // Helper to get the full image URL
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const getImageUrl = (mediaData: any): string => {
//   const url = mediaData?.data?.attributes?.url || mediaData?.url
//   return url ? (url.startsWith('http') ? url : `${API_URL}${url}`) : '/placeholder.png'
// }

// // --- Data Mappers ---

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const mapStrapiToProject = (item: StrapiDataItem<any>): BaseProject | ProjectDetail => {
//   const attr = item.attributes || {}
//   // Support flat payloads from the API by falling back to item when fields are not nested.
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const flat: any = item as any
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const source: any = flat?.title ? flat : attr

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const mappedTags = attr.tags?.data?.map((tag: any) => tag.attributes?.name) || source.tags || []
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const mappedGridImages = attr.gridImage?.map((img: any) => getImageUrl(img)) || source.gridImage || []

//   const baseData: BaseProject = {
//     id: source.slug || source.documentId || item.id?.toString?.() || '',
//     title: source.title,
//     description: source.description,
//     location: source.location,
//     client: source.client,
//     status: source.projectStatus?.trim?.() || source.status || 'N/A',
//     date: source.date,
//     category: attr.category?.data?.attributes?.name || attr.category?.name || source.category || 'N/A',
//     tags: mappedTags,
//     image: getImageUrl(attr.mainImage || source.mainImage),
//   }

//   const detailData: ProjectDetail = {
//     ...baseData,
//     fullDescription: (source.fullDescription as StrapiContentBlock) || [],
//     contractValue: source.contractValue,
//     startingPoint: source.startingPoint,
//     endingPoint: source.endingPoint,
//     gridImages: mappedGridImages,
//   }

//   return detailData
// }

// const mapStrapiToTeamMember = (item: StrapiDataItem<any>): TeamMember => {
//   const attr = item.attributes || {}
//   // Support flat payloads (sample shared) and attributes-based payloads.
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const flat = item as any
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const source: any = flat?.name ? flat : attr

//   const sortOrderValue = Number.isFinite(source?.sortOrder) ? source.sortOrder : 0
//   const rawImage = attr.profilePicture || source?.profilePicture

//   return {
//     id: source?.slug || source?.documentId || item.id?.toString?.() || '',
//     name: source?.name || 'Unknown',
//     position: source?.position || 'Unknown Position',
//     qualification: source?.qualification || 'Unknown Qualification',
//     experience: source?.experience || 'Unknown Experience',
//     profilePicture: getImageUrl(rawImage),
//     sortOrder: sortOrderValue,
//   }
// }

// // --- EXPORTED FETCHING FUNCTIONS ---

// export const fetchAllProjects = async (): Promise<BaseProject[]> => {
//   const populate = 'populate[0]=category&populate[1]=tags&populate[2]=mainImage'
//   const path = `/api/projects?${populate}`

//   const json: StrapiListResponse<BaseProject> = await fetchStrapiData(path)

//   return json.data ? (json.data.map(mapStrapiToProject) as BaseProject[]) : []
// }

// export const fetchProjectDetail = async (slug: string): Promise<ProjectDetail | null> => {
//   const populate = 'populate[0]=category&populate[1]=tags&populate[2]=mainImage&populate[3]=gridImage'
//   const path = `/api/projects?filters[slug][$eq]=${slug}&${populate}`

//   const json: StrapiListResponse<ProjectDetail> = await fetchStrapiData(path)

//   if (!json.data || json.data.length === 0) {
//     return null
//   }

//   return mapStrapiToProject(json.data[0] as StrapiDataItem<ProjectDetail>) as ProjectDetail
// }

// /**
//  * Fetches all team members.
//  * FIX: Removed the invalid 'sort=sortOrder:asc' parameter to avoid the 400 error.
//  */
// export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
//   // Populate profilePicture so media URL is included; omit sort to avoid 400.
//   const path = `/api/team-members?populate=profilePicture`

//   const json: StrapiListResponse<TeamMember> = await fetchStrapiData(path)

//   return json.data ? (json.data.map(mapStrapiToTeamMember) as TeamMember[]) : []
// }











































// lib/strapi-fetch.ts

import { BaseProject, ProjectDetail, TeamMember, StrapiContentBlock } from './interfaces'

// --- CONFIGURATION ---
// Default to live Strapi; trim trailing slash to avoid double "//"
const API_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.macrogc.com').replace(/\/$/, '')

// --- UTILITY TYPES ---
type StrapiDataItem<T> = {
  id: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: T | Record<string, any>
}

type StrapiListResponse<T> = { data: StrapiDataItem<T>[] }

// --- CORE FETCH HELPER ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchStrapiData(path: string): Promise<any> {
  const fullUrl = `${API_URL}${path}`

  const headers = {
    'Content-Type': 'application/json',
  }

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers,
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error(`Strapi API Error: ${response.status} ${response.statusText}`, errorBody)
    // Throwing an error here is critical to catch the 500 on the page component
    throw new Error(`Failed to fetch project: ${response.status} ${response.statusText} ${errorBody}`)
  }

  return response.json()
}

// Helper to get the full image URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getImageUrl = (mediaData: any): string => {
  const url = mediaData?.data?.attributes?.url || mediaData?.url
  return url ? (url.startsWith('http') ? url : `${API_URL}${url}`) : '/placeholder.png'
}

// --- Data Mappers ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStrapiToProject = (item: StrapiDataItem<any>): BaseProject | ProjectDetail => {
  const attr = item.attributes || {}
  // Support flat payloads (old or no-populate) and attributes-based payloads (Strapi V4)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flat: any = item as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const source: any = flat?.title ? flat : attr

  // Project list fetch only populates category/image. Detail page populates more.
  // CRITICAL: Grid Images logic adjusted for potential empty array/missing populate
  const mappedTags = (() => {
    // Prefer populated relation tags
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fromRelation = attr.tags?.data?.map((tag: any) => tag?.attributes?.name).filter(Boolean)
    if (fromRelation && fromRelation.length > 0) return fromRelation
    // Fallback to flat array, coercing objects to their name
    if (Array.isArray(source.tags)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return source.tags.map((t: any) => (typeof t === 'string' ? t : t?.name)).filter(Boolean)
    }
    return []
  })()
  // CRITICAL: If gridImage is not populated, this will be an empty array.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedGridImages = attr.gridImage?.data?.map((img: any) => getImageUrl(img.attributes)) || []

  const categoryRaw =
    attr.category?.data?.attributes?.name ??
    attr.category?.name ??
    (typeof attr.category === 'string' ? attr.category : undefined) ??
    source.category?.name ??
    (typeof source.category === 'string' ? source.category : undefined) ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (source.category as any)?.attributes?.name
  const categoryName = typeof categoryRaw === 'string' ? categoryRaw.trim() : ''

  const slug = source.slug || source.documentId || item.id?.toString?.() || ''

  const baseData: BaseProject = {
    id: slug,
    slug,
    title: source.title,
    description: source.description,
    location: source.location || '',
    client: source.client || '',
    status: source.projectStatus?.trim?.() || source.status || 'N/A',
    date: source.date || '',
    category: categoryName || 'N/A',
    tags: mappedTags,
    image: getImageUrl(attr.mainImage || source.mainImage),
  }

  const detailData: ProjectDetail = {
    ...baseData,
    fullDescription: (source.fullDescription as StrapiContentBlock) || [],
    contractValue: source.contractValue,
    startingPoint: source.startingPoint,
    endingPoint: source.endingPoint,
    gridImages: mappedGridImages,
  }

  return detailData
}

// CRITICAL FIX: The mapping logic for Team Member has been consolidated and made more robust
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStrapiToTeamMember = (item: StrapiDataItem<any>): TeamMember => {
  const attr = item.attributes || {}
  // Support flat payloads (sample shared) and attributes-based payloads.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flat = item as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const source: any = flat?.name ? flat : attr

  const sortOrderValue = Number.isFinite(source?.sortOrder) ? source.sortOrder : 0
  const rawImage = attr.profilePicture || source?.profilePicture

  return {
    id: source?.slug || source?.documentId || item.id?.toString?.() || '',
    name: source?.name || 'Unknown',
    position: source?.position || 'Unknown Position',
    qualification: source?.qualification || 'Unknown Qualification',
    experience: source?.experience || 'Unknown Experience',
    profilePicture: getImageUrl(rawImage),
    sortOrder: sortOrderValue,
  }
}

// --- EXPORTED FETCHING FUNCTIONS ---

export const fetchAllProjects = async (): Promise<BaseProject[]> => {
  const populate = 'populate[0]=category&populate[1]=mainImage'
  const path = `/api/projects?${populate}`

  const json: StrapiListResponse<BaseProject> = await fetchStrapiData(path)

  return json.data ? (json.data.map(mapStrapiToProject) as BaseProject[]) : []
}

export const fetchProjectBySlug = async (slug: string): Promise<ProjectDetail | null> => {
  // FIX 500: Simplified populate to avoid potential errors from misconfigured tags/gridImage
  const populate = 'populate[0]=category&populate[1]=mainImage'
  const path = `/api/projects?filters[slug][$eq]=${slug}&${populate}`

  const json: StrapiListResponse<ProjectDetail> = await fetchStrapiData(path)

  if (!json.data || json.data.length === 0) {
    return null
  }

  return mapStrapiToProject(json.data[0] as StrapiDataItem<ProjectDetail>) as ProjectDetail
}

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  // FIX: Removed the invalid 'sort' parameter and ensure populate works.
  const path = `/api/team-members?populate=profilePicture`

  const json: StrapiListResponse<TeamMember> = await fetchStrapiData(path)

  return json.data ? (json.data.map(mapStrapiToTeamMember) as TeamMember[]) : []
}