'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, MapPin, Building, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useProjects } from '@/hooks/useProjects'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const [showAllProjects, setShowAllProjects] = useState(false)
  
  // Fetch projects from Strapi using React Query
  const { data: projects = [], isLoading, error } = useProjects()
  
  // Function to shuffle array randomly
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const categories = ['All Projects', 'Road Construction', 'Real Estate Development', 'Infrastructure']

  // Filter projects based on selected category and randomize for "All Projects"
  const allFilteredProjects = useMemo(() => {
    if (selectedCategory === 'All Projects') {
      return shuffleArray(projects)
    }
    return projects.filter(project => project.category === selectedCategory)
  }, [selectedCategory, projects])

  // Show only first 9 projects initially, unless showAllProjects is true
  const filteredProjects = showAllProjects ? allFilteredProjects : allFilteredProjects.slice(0, 9)

  // Reset showAllProjects when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setShowAllProjects(false)
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="relative text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/Bishoftu/picture2.jpg"
              alt="Our Projects"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Building className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
              <span className="ml-3 text-lg text-gray-600">Loading projects...</span>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="relative text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/Bishoftu/picture2.jpg"
              alt="Our Projects"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Building className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <p className="text-lg text-red-600 mb-4">Error loading projects. Please check your Strapi configuration.</p>
              <p className="text-sm text-gray-500">Make sure NEXT_PUBLIC_STRAPI_URL is set correctly in your .env.local file</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Bishoftu/picture2.jpg"
            alt="Our Projects"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Building className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
            Delivering excellence in construction and infrastructure across Ethiopia
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-brand-600 mb-2">200+</div>
              <div className="text-lg text-gray-700">Completed Projects</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-600 mb-2">10-15</div>
              <div className="text-lg text-gray-700">Active Projects</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-600 mb-2">30+</div>
              <div className="text-lg text-gray-700">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-600 mb-2">Grade I</div>
              <div className="text-lg text-gray-700">Certification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-brand-600 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Active' 
                        ? 'bg-brand-600 text-white' 
                        : 'bg-green-600 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white z-20">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{project.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{project.date}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!showAllProjects && allFilteredProjects.length > 9 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAllProjects(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 inline-flex items-center gap-2"
              >
                Load More Projects ({allFilteredProjects.length - 9} more)
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's work together to bring your construction vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center gap-2"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
