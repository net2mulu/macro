// app/projects/[slug]/page.tsx

export const dynamic = 'force-dynamic'
export const revalidate = 0

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, ArrowLeft, User, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchProjectBySlug, fetchProjects, transformProject } from '@/lib/strapi'
import { ProjectDetail, BaseProject, StrapiContentBlock } from '@/lib/interfaces'

/**
 * Helper function to extract and format text from Strapi's Rich Text (Lexical/Blocks) structure.
 * @param fullDescription - The raw rich text data from Strapi.
 * @returns A clean string suitable for rendering in a <p> tag.
 */
function extractText(fullDescription: unknown): string {
  if (!fullDescription) return ''

  if (typeof fullDescription === 'string') {
    try {
      const parsed = JSON.parse(fullDescription)
      if (Array.isArray(parsed)) {
        fullDescription = parsed as StrapiContentBlock
      } else {
        return fullDescription
      }
    } catch {
      return typeof fullDescription === 'string' ? fullDescription : ''
    }
  }

  if (Array.isArray(fullDescription)) {
    return (fullDescription as StrapiContentBlock)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((block: any) => block?.children?.map((c: any) => c?.text).join(' ') || '')
      .filter(Boolean)
      .join('\n\n')
  }

  return typeof fullDescription === 'string' ? fullDescription : ''
}

type ProjectTransformed = ProjectDetail

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)
  
  console.log('Project detail page - slug:', slug)

  let project: ProjectTransformed | null = null
  try {
    const response = await fetchProjectBySlug(slug)
    console.log('Fetch response:', { hasData: !!response.data, slug })
    if (response.data) {
      const transformed = transformProject(response.data)
      // Handle fullDescription type - it can be string, array, or undefined
      project = {
        ...transformed,
        fullDescription: (Array.isArray(transformed.fullDescription) 
          ? transformed.fullDescription 
          : (typeof transformed.fullDescription === 'string' 
            ? transformed.fullDescription 
            : [])) as StrapiContentBlock
      } as ProjectTransformed
      console.log('Transformed project:', { title: project.title, slug: project.slug })
    }
  } catch (e) {
    console.error('Failed to fetch project detail:', e)
    return notFound()
  }

  if (!project || !project.title) {
    console.error('Project not found or invalid:', { project, slug })
    return notFound()
  }

  const overviewText = extractText(project.fullDescription) || project.description || ''

  let relatedProjects: BaseProject[] = []
  try {
    const allResponse = await fetchProjects()
    if (allResponse.data) {
      const all = allResponse.data.map(transformProject) as BaseProject[]
      relatedProjects = all.filter((p) => p.slug !== project!.slug).slice(0, 3)
    }
  } catch {
    relatedProjects = []
  }

  // Debug grid images
  if (process.env.NODE_ENV === 'development') {
    console.log('Grid images for project:', {
      title: project.title,
      gridImages: project.gridImages,
      count: project.gridImages?.length || 0
    })
  }
  
  const gridImages: string[] = project.gridImages?.length
    ? project.gridImages
    : ['/placeholder-grid-1.png', '/placeholder-grid-2.png', '/placeholder-grid-3.png', '/placeholder-grid-4.png']

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title || 'Project'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white mb-8 hover:text-brand-300 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Projects</span>
          </Link>
          <div className="mb-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                project.status === 'Active' ? 'bg-brand-600 text-white' : 'bg-green-600 text-white'
              }`}
            >
              {project.status}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{project.description}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>

                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                  {overviewText || project.description}
                </p>

                {project.startingPoint && project.endingPoint && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="h-6 w-6 text-brand-600" />
                        <h3 className="font-semibold text-gray-900">Starting Point</h3>
                      </div>
                      <p className="text-gray-600">{project.startingPoint}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="h-6 w-6 text-brand-600" />
                        <h3 className="font-semibold text-gray-900">Ending Point</h3>
                      </div>
                      <p className="text-gray-600">{project.endingPoint}</p>
                    </div>
                  </div>
                )}
              </div>

              {gridImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {gridImages.map((imgSrc, imgIndex) => (
                    <div key={imgIndex} className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={imgSrc}
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                        unoptimized={imgSrc.startsWith('http') && !imgSrc.includes(process.env.NEXT_PUBLIC_STRAPI_URL || '')}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-50 p-8 rounded-lg sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Information</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-5 w-5" />
                      <span className="font-semibold text-gray-900">Location</span>
                    </div>
                    <p className="text-gray-700">{project.location}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <User className="h-5 w-5" />
                      <span className="font-semibold text-gray-900">Client</span>
                    </div>
                    <p className="text-gray-700">{project.client}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-semibold text-gray-900">Date</span>
                    </div>
                    <p className="text-gray-700">{project.date}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-5 w-5" />
                      <span className="font-semibold text-gray-900">Category</span>
                    </div>
                    <p className="text-gray-700">{project.category}</p>
                  </div>
                </div>

                {project.contractValue && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="font-semibold text-lg text-gray-900">Contract Value</p>
                    <p className="text-xl font-bold text-brand-600">{project.contractValue}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.id}
                    href={`/projects/${encodeURIComponent(related.slug || related.id || '')}`}
                    className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.title || 'Project'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-sm bg-brand-600 px-2 py-1 rounded">{related.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2">{related.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}