'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchProjects, fetchProjectBySlug, transformProject, fetchCategories } from '@/lib/strapi'

export interface Project {
  slug?: string
  id: string
  title: string
  description: string
  fullDescription: string
  location: string
  client: string
  date: string
  tags: string[]
  category: string
  image: string
  status: string
  startingPoint?: string
  endingPoint?: string
  gridImages?: string[]
  contract?: string
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const response = await fetchProjects()
        if (!response || !response.data) {
          console.error('Invalid response from fetchProjects:', response)
          return []
        }
        return response.data.map(transformProject) as Project[]
      } catch (error) {
        console.error('Error fetching projects:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export function useProjectBySlug(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const response = await fetchProjectBySlug(slug)
      return transformProject(response.data) as Project
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetchCategories()
      return response.data.map((c) => ({
        id: c.documentId || c.id?.toString?.() || '',
        name: c.attributes?.name || c.name || '',
        slug: c.attributes?.slug || c.slug || '',
      }))
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

