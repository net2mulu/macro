// Strapi API configuration and utilities

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.macrogc.com/'
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''

export interface StrapiProject {
  id: number
  attributes: {
    title: string
    description: string
    fullDescription?: string
    location: string
    client: string
    date: string
    tags?: string[]
    category: string
    image?: {
      data?: {
        attributes: {
          url: string
        }
      }
    }
    status: string
    startingPoint?: string
    endingPoint?: string
    gridImages?: {
      data?: Array<{
        attributes: {
          url: string
        }
      }>
    }
    slug: string
    contract?: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
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
  if (!image?.data?.attributes?.url) {
    return '/background/1.png' // fallback image
  }
  const url = image.data.attributes.url
  // If URL is already absolute, return it; otherwise prepend Strapi URL
  if (url.startsWith('http')) {
    return url
  }
  return `${STRAPI_URL}${url}`
}

// Helper function to get multiple image URLs
export function getStrapiImageUrls(images: any): string[] {
  if (!images?.data || !Array.isArray(images.data)) {
    return []
  }
  return images.data.map((img: any) => getStrapiImageUrl({ data: img }))
}

// Transform Strapi project to frontend format
export function transformProject(strapiProject: StrapiProject) {
  return {
    id: strapiProject.attributes.slug || `project-${strapiProject.id}`,
    title: strapiProject.attributes.title,
    description: strapiProject.attributes.description,
    fullDescription: strapiProject.attributes.fullDescription || strapiProject.attributes.description,
    location: strapiProject.attributes.location,
    client: strapiProject.attributes.client,
    date: strapiProject.attributes.date,
    tags: strapiProject.attributes.tags || [],
    category: strapiProject.attributes.category,
    image: getStrapiImageUrl(strapiProject.attributes.image),
    status: strapiProject.attributes.status,
    startingPoint: strapiProject.attributes.startingPoint,
    endingPoint: strapiProject.attributes.endingPoint,
    gridImages: getStrapiImageUrls(strapiProject.attributes.gridImages),
    contract: strapiProject.attributes.contract,
  }
}

// Fetch all projects from Strapi
export async function fetchProjects(): Promise<StrapiResponse<StrapiProject[]>> {
  const url = `${STRAPI_URL}/api/projects?populate=*&sort=createdAt:desc`
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  const response = await fetch(url, {
    headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`)
  }

  return response.json()
}

// Fetch a single project by slug
export async function fetchProjectBySlug(slug: string): Promise<StrapiResponse<StrapiProject>> {
  const url = `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  const response = await fetch(url, {
    headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch project: ${response.statusText}`)
  }

  const data = await response.json()
  
  if (!data.data || data.data.length === 0) {
    throw new Error(`Project with slug "${slug}" not found`)
  }

  return {
    data: data.data[0],
    meta: data.meta
  }
}

