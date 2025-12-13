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
  if (!image) {
    return '/placeholder.png'
  }
  
  // string URL (already a URL string)
  if (typeof image === 'string') {
    if (image.startsWith('http')) return image
    if (image.startsWith('/')) return `${STRAPI_URL}${image}`
    return `${STRAPI_URL}/${image}`
  }
  
  // Handle Strapi v4/v5 format with populated media
  // Format: { data: { id, attributes: { url, alternativeText, ... } } }
  // Or: { data: { attributes: { url } } }
  // Or: { attributes: { url } }
  let url = null
  
  if (image?.data) {
    // Nested data structure
    if (image.data.attributes?.url) {
      url = image.data.attributes.url
    } else if (image.data.url) {
      url = image.data.url
    } else if (Array.isArray(image.data) && image.data[0]?.attributes?.url) {
      // Array of media items, take first one
      url = image.data[0].attributes.url
    }
  } else if (image?.attributes?.url) {
    // Direct attributes
    url = image.attributes.url
  } else if (image?.url) {
    // Direct url property
    url = image.url
  }
  
  if (!url) {
    console.warn('Image URL not found. Image data:', image)
    return '/placeholder.png'
  }
  
  // Ensure URL is absolute - Strapi returns relative URLs like /uploads/...
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // Handle relative URLs from Strapi
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`
  }
  
  // If no leading slash, add it
  return `${STRAPI_URL}/${url}`
}

// Helper function to get multiple image URLs
// Based on Strapi REST API documentation: https://docs.strapi.io/cms/api/rest/interactive-query-builder
export function getStrapiImageUrls(images: any): string[] {
  if (!images) return []
  
  // Handle array of strings (direct URLs)
  if (Array.isArray(images) && typeof images[0] === 'string') {
    return images.map((u) => getStrapiImageUrl(u)).filter(Boolean)
  }
  
  // Handle Strapi media structure with data array
  // Format: { data: [{ id, attributes: { url, ... } }] } or { data: [{ id, url, ... }] }
  if (images?.data && Array.isArray(images.data)) {
    return images.data.map((img: any) => {
      // Case 1: img.attributes.url (nested attributes structure)
      if (img?.attributes?.url) {
        return getStrapiImageUrl({ data: { attributes: img.attributes } })
      }
      
      // Case 2: img.url (flat structure without attributes wrapper)
      if (img?.url) {
        return getStrapiImageUrl(img)
      }
      
      // Case 3: img.data.attributes.url (double nested)
      if (img?.data?.attributes?.url) {
        return getStrapiImageUrl({ data: img.data })
      }
      
      // Case 4: Try to extract URL from any nested structure
      if (img?.attributes) {
        return getStrapiImageUrl({ data: { attributes: img.attributes } })
      }
      
      // Case 5: Fallback - try to use the image object directly
      return getStrapiImageUrl({ data: img })
    }).filter(Boolean)
  }
  
  // Handle array of image objects directly (without data wrapper)
  // Format: [{ attributes: { url } }] or [{ url }]
  if (Array.isArray(images) && typeof images[0] === 'object') {
    return images.map((img: any) => {
      if (img?.attributes?.url) {
        return getStrapiImageUrl({ data: { attributes: img.attributes } })
      }
      if (img?.url) {
        return getStrapiImageUrl(img)
      }
      return getStrapiImageUrl({ data: img })
    }).filter(Boolean)
  }
  
  // Handle single image object (not in array)
  if (images?.attributes || images?.url) {
    const singleUrl = getStrapiImageUrl(images)
    return singleUrl && singleUrl !== '/placeholder.png' ? [singleUrl] : []
  }
  
  return []
}

// Transform Strapi project to frontend format
export function transformProject(strapiProject: StrapiProject) {
  // Handle both flat structure (no attributes) and nested structure (with attributes)
  const attr = strapiProject.attributes || strapiProject
  
  // Extract category - handle various formats
  const categoryRaw =
    attr?.category?.data?.attributes?.name ??
    attr?.category?.attributes?.name ??
    attr?.category?.name ??
    (typeof attr?.category === 'string' ? attr.category : undefined) ??
    (attr?.category as any)?.attributes?.name
  const categoryName =
    (typeof categoryRaw === 'string' ? categoryRaw.trim() : '') ||
    ''

  // Extract tags - handle various formats
  const tagsRaw = (() => {
    if (Array.isArray((attr as any)?.tags?.data)) {
      return (attr as any).tags.data.map((t: any) => t?.attributes?.name || t?.name).filter(Boolean)
    }
    if (Array.isArray((attr as any)?.tags)) {
      return (attr as any).tags.map((t: any) => (typeof t === 'string' ? t : t?.name || t?.attributes?.name)).filter(Boolean)
    }
    return []
  })()

  // Extract image - check multiple possible field names and structures
  const imageData = attr.mainImage || attr.image || (attr as any).main_image || (attr as any).projectImage
  const imageUrl = getStrapiImageUrl(imageData)
  
  // Parse fullDescription if it's a JSON string
  let fullDescription = attr.fullDescription || attr.description
  if (typeof fullDescription === 'string' && fullDescription.startsWith('[')) {
    try {
      fullDescription = JSON.parse(fullDescription)
    } catch (e) {
      // If parsing fails, use as is
      console.warn('Failed to parse fullDescription JSON:', e)
    }
  }
  
  // Debug logging to help identify image issues
  if (process.env.NODE_ENV === 'development') {
    if (!imageUrl || imageUrl === '/placeholder.png') {
      console.log('Project image issue:', {
        title: attr.title,
        mainImage: attr.mainImage,
        image: attr.image,
        imageData,
        result: imageUrl,
        strapiUrl: STRAPI_URL,
        allKeys: Object.keys(attr)
      })
    } else {
      console.log('Project image URL:', {
        title: attr.title,
        imageUrl
      })
    }
  }
  
  // Check all possible image field names in the response
  // Since the API response shows no image fields, we need to check what's actually available
  const allImageFields = {
    mainImage: attr.mainImage,
    image: attr.image,
    main_image: (attr as any).main_image,
    projectImage: (attr as any).projectImage,
    thumbnail: (attr as any).thumbnail,
    coverImage: (attr as any).coverImage,
    cover_image: (attr as any).cover_image,
    photo: (attr as any).photo,
    picture: (attr as any).picture,
  }
  
  // Extract grid images - try multiple field name variations
  const gridImagesRaw = 
    attr.gridImages || 
    (attr as any).grid_images || 
    (attr as any).gridImage || 
    (attr as any).gallery || 
    (attr as any).galleryImages ||
    (attr as any).images
  const gridImagesUrls = getStrapiImageUrls(gridImagesRaw)
  
  // Debug: log all fields to find image
  if (process.env.NODE_ENV === 'development') {
    const imageFields = Object.entries(allImageFields).filter(([_, value]) => value !== undefined && value !== null)
    if (imageFields.length > 0) {
      console.log(`✅ Found image fields for "${attr.title}":`, imageFields)
    } else {
      console.warn(`⚠️ No image fields found for "${attr.title}". Available fields:`, Object.keys(attr))
    }
    
    // Debug grid images
    if (gridImagesRaw) {
      console.log(`📸 Grid images data for "${attr.title}":`, {
        raw: gridImagesRaw,
        extracted: gridImagesUrls,
        count: gridImagesUrls.length
      })
    } else {
      console.warn(`⚠️ No grid images field found for "${attr.title}". Checked: gridImages, grid_images, gridImage, gallery, galleryImages, images`)
    }
  }
  
  return {
    id: attr.slug || strapiProject.documentId || `project-${strapiProject.id}`,
    slug: attr.slug || strapiProject.documentId || strapiProject.id?.toString?.(),
    title: attr.title,
    description: attr.description,
    fullDescription: fullDescription,
    location: attr.location?.trim?.() || 'Unknown',
    client: attr.client,
    date: attr.date,
    tags: tagsRaw,
    category: categoryName,
    image: imageUrl,
    status: (attr.projectStatus || attr.status || 'Active').trim(),
    startingPoint: attr.startingPoint,
    endingPoint: attr.endingPoint,
    gridImages: gridImagesUrls,
    contract: attr.contractValue || attr.contract,
  }
}

// Fetch all projects from Strapi
export async function fetchProjects(): Promise<StrapiResponse<StrapiProject[]>> {
  // Try populate=* first - if that doesn't work with images, we'll use specific populate
  // According to Strapi REST API docs, populate=* should populate all relations
  const url = `${STRAPI_URL}/api/projects?populate=*`
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`

  const response = await fetch(url, { headers, cache: 'no-store' })
  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('Failed to fetch projects:', response.status, errorText)
    console.error('Request URL:', url)
    throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}. ${errorText}`)
  }
  const data = await response.json()
  
  // Debug: log the structure to understand what we're getting
  if (process.env.NODE_ENV === 'development' && data.data && data.data.length > 0) {
    const sample = data.data[0]
    console.log('📦 Sample project structure:', JSON.stringify(sample, null, 2))
    console.log('🔑 Project keys:', Object.keys(sample))
    
    // Check if there's an attributes wrapper
    if (sample.attributes) {
      console.log('📋 Attributes keys:', Object.keys(sample.attributes))
    }
    
    // Look for any field that might be an image
    const allKeys = sample.attributes ? Object.keys(sample.attributes) : Object.keys(sample)
    const possibleImageFields = allKeys.filter(key => 
      key.toLowerCase().includes('image') || 
      key.toLowerCase().includes('photo') || 
      key.toLowerCase().includes('picture') ||
      key.toLowerCase().includes('thumbnail') ||
      key.toLowerCase().includes('media')
    )
    if (possibleImageFields.length > 0) {
      console.log('🖼️ Possible image fields found:', possibleImageFields)
    } else {
      console.warn('⚠️ No image-related fields found in project data')
    }
  }
  
  return data
}

// Fetch a single project by slug/id/documentId
export async function fetchProjectBySlug(slug: string): Promise<StrapiResponse<StrapiProject>> {
  const safeSlug = encodeURIComponent(slug)
  
  // According to Strapi REST API docs, use populate=* to get all relations including grid images
  // For nested populate, we can also use: populate[gridImages][populate]=*
  // Try multiple approaches to find the project
  const urls = [
    `${STRAPI_URL}/api/projects?filters[slug][$eq]=${safeSlug}&populate=*`,
    `${STRAPI_URL}/api/projects?filters[slug][$eq]=${safeSlug}&populate[gridImages][populate]=*`,
    `${STRAPI_URL}/api/projects?filters[documentId][$eq]=${safeSlug}&populate=*`,
    `${STRAPI_URL}/api/projects?filters[id][$eq]=${safeSlug}&populate=*`,
  ]
  
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`

  // Try each URL until one works
  for (const url of urls) {
    try {
      const response = await fetch(url, { headers, cache: 'no-store' })
      
      if (!response.ok) {
        console.warn(`Failed with URL ${url}:`, response.status)
        continue
      }

      const data = await response.json()
      
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        const firstItem = data.data?.[0]
        const attr = firstItem?.attributes || firstItem
        console.log('Project detail fetch response:', {
          slug,
          url,
          hasData: !!data.data,
          dataLength: data.data?.length || 0,
          firstItemKeys: firstItem ? Object.keys(firstItem) : null,
          attrKeys: attr ? Object.keys(attr) : null,
          gridImagesField: attr?.gridImages || attr?.grid_images || attr?.gridImage || attr?.gallery,
          gridImagesType: typeof (attr?.gridImages || attr?.grid_images || attr?.gridImage || attr?.gallery),
          gridImagesIsArray: Array.isArray(attr?.gridImages || attr?.grid_images || attr?.gridImage || attr?.gallery)
        })
        
        // Log the actual grid images structure if it exists
        const gridImagesRaw = attr?.gridImages || attr?.grid_images || attr?.gridImage || attr?.gallery
        if (gridImagesRaw) {
          console.log('📸 Grid images raw structure:', JSON.stringify(gridImagesRaw, null, 2))
        }
      }
      
      if (data.data && data.data.length > 0) {
        return {
          data: data.data[0],
          meta: data.meta,
        }
      }
    } catch (error) {
      console.warn(`Error fetching with URL ${url}:`, error)
      continue
    }
  }
  
  throw new Error(`Project with slug "${slug}" not found`)
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
