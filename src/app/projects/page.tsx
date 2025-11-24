'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, MapPin, Building, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  
  // Function to shuffle array randomly
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  const projects = [
    {
      id: 'warder-kebridehar-road',
      title: 'Warder-Kebridehar Road Project',
      description: 'Major road construction project in the Somali Regional State (Qurhaeye & Dollo Zones).',
      location: 'Somali Regional State',
      client: 'Ethiopian Roads Authority',
      contract: '1,814,123,577.90 ETB',
      date: '2020-2024',
      tags: ['Active', 'Road Construction', '70% Progress'],
      category: 'Road Construction',
      image: '/projects/warder kebridehar road project.jpg',
      status: 'Active'
    },
    {
      id: 'fik-segeg-gebro-yoale',
      title: 'Fik-Segeg-Gebro-Danan Road Project, Lot II',
      description: 'Segeg-Gebro-Yoale Road (Km 90+000 – Km 191+000).',
      location: 'Somali Region',
      client: 'Ethiopian Roads Authority',
      contract: '1,232,011,537.10 ETB',
      date: '2022-2025',
      tags: ['Active', 'Road Construction', '28% Progress'],
      category: 'Road Construction',
      image: '/background/3.png',
      status: 'Active'
    },
    {
      id: 'bishoftu-corridor',
      title: 'Bishoftu Corridor Development Project',
      description: 'Corridor side development project.',
      location: 'Bishoftu',
      client: 'Ethiopian Roads Authority',
      contract: '938,178,274.76 ETB',
      date: '2023-2024',
      tags: ['Active', 'Corridor Development', '90% Progress'],
      category: 'Road Construction',
      image: '/background/1.png',
      status: 'Active'
    },
    {
      id: 'shaggar-city',
      title: 'Shaggar City Corridor Development',
      description: 'Burayu Sub-City Corridor lot-1 (3.51km).',
      location: 'Burayu Sub-City',
      client: 'Ethiopian Roads Authority',
      contract: '759,749,542.45 ETB',
      date: '2023-2024',
      tags: ['Active', 'Corridor Development', '46% Progress'],
      category: 'Road Construction',
      image: '/right/1.png',
      status: 'Active'
    },
    {
      id: 'fik-hamero-imi',
      title: 'Fik-Hamero-Imi Road Project',
      description: 'Construction of 81 km DBST, Bridge, Earthwork, Sub-base, Base course, and drainage structures.',
      location: 'Somali Region',
      client: 'Ethiopian Roads Authority',
      contract: '819,129,220.55 ETB',
      date: 'May 2017 - March 2023',
      tags: ['Completed', 'Road Construction', '81 km'],
      category: 'Road Construction',
      image: '/right/3.png',
      status: 'Completed'
    },
    {
      id: 'ayat-roundabout',
      title: 'Ayat Roundabout - Bole Arabsa Asphalt Road',
      description: 'Construction of 4.2km Asphalt Concrete Road Project with TELE utility & EPPCO utility line.',
      location: 'Addis Ababa',
      client: 'Addis Ababa Roads Authority',
      contract: '320,797,446.09 ETB',
      date: 'December 2015 - May 2017',
      tags: ['Completed', 'Asphalt Road', '4.2 km'],
      category: 'Road Construction',
      image: '/background/5.png',
      status: 'Completed'
    },
    {
      id: 'cmc-michael-bridge',
      title: 'CMC-Michael Overpass Bridge',
      description: 'Construction of overpass bridge and related approach road from Michael side to Goro side.',
      location: 'Addis Ababa',
      client: 'Addis Ababa City Roads Authority',
      contract: '134,348,619.41 ETB',
      date: 'October 2014 - July 2021',
      tags: ['Completed', 'Bridge Construction'],
      category: 'Infrastructure',
      image: '/background/6.png',
      status: 'Completed'
    },
    {
      id: 'hargale-dolobay',
      title: 'Hargale - Dolobay - Dolo Odo Design Build Road',
      description: 'Design & Build of 82 km Road Project including Genale River Bridge (140m, 7 spans).',
      location: 'Somali Region',
      client: 'Ethiopian Roads Authority',
      contract: '405,726,000.00 ETB',
      date: 'September 2010 - April 2014',
      tags: ['Completed', 'Design Build', '82 km'],
      category: 'Road Construction',
      image: '/background/7.png',
      status: 'Completed'
    },
    {
      id: 'nehile-ab-ala',
      title: 'Nehile-Ab Ala Road Project',
      description: 'Construction of 58.7 km Road Project with all necessary drainage structures including 21 bridges.',
      location: 'Various Regions',
      client: 'Ethiopian Roads Authority',
      contract: '376,241,107.09 ETB',
      date: 'April 2010 - May 2014',
      tags: ['Completed', 'Road Construction', '21 Bridges'],
      category: 'Road Construction',
      image: '/background/8.png',
      status: 'Completed'
    },
    {
      id: 'addis-residential-complex',
      title: 'Addis Ababa Residential Complex',
      description: 'Modern residential complex featuring luxury apartments, commercial spaces, and recreational facilities in the heart of Addis Ababa.',
      location: 'Addis Ababa',
      client: 'Private Developer',
      contract: '2,500,000,000.00 ETB',
      date: '2022-2025',
      tags: ['Active', 'Residential', '85% Progress'],
      category: 'Real Estate Development',
      image: '/background/1.png',
      status: 'Active'
    },
    {
      id: 'bishoftu-mixed-use',
      title: 'Bishoftu Mixed-Use Development',
      description: 'Integrated mixed-use development including residential units, shopping mall, office spaces, and hotel facilities.',
      location: 'Bishoftu',
      client: 'Private Developer',
      contract: '1,800,000,000.00 ETB',
      date: '2023-2026',
      tags: ['Active', 'Mixed-Use', '45% Progress'],
      category: 'Real Estate Development',
      image: '/background/3.png',
      status: 'Active'
    },
    {
      id: 'addis-commercial-tower',
      title: 'Addis Commercial Tower',
      description: 'High-rise commercial tower with office spaces, retail shops, and parking facilities in the central business district.',
      location: 'Addis Ababa',
      client: 'Private Developer',
      contract: '1,200,000,000.00 ETB',
      date: 'January 2020 - December 2023',
      tags: ['Completed', 'Commercial', '25 Floors'],
      category: 'Real Estate Development',
      image: '/background/5.png',
      status: 'Completed'
    },
    {
      id: 'gondar-housing-project',
      title: 'Gondar Affordable Housing Project',
      description: 'Large-scale affordable housing development project providing quality homes for middle-income families.',
      location: 'Gondar',
      client: 'Ministry of Urban Development',
      contract: '950,000,000.00 ETB',
      date: '2021-2024',
      tags: ['Active', 'Affordable Housing', '92% Progress'],
      category: 'Real Estate Development',
      image: '/right/1.png',
      status: 'Active'
    },
    {
      id: 'hawassa-luxury-villas',
      title: 'Hawassa Luxury Villas',
      description: 'Exclusive gated community featuring luxury villas with modern amenities and lake views.',
      location: 'Hawassa',
      client: 'Private Developer',
      contract: '680,000,000.00 ETB',
      date: 'March 2019 - August 2022',
      tags: ['Completed', 'Luxury Housing', '50 Villas'],
      category: 'Real Estate Development',
      image: '/background/7.png',
      status: 'Completed'
    }
  ]

  const categories = ['All Projects', 'Road Construction', 'Real Estate Development', 'Infrastructure']

  // Filter projects based on selected category and randomize for "All Projects"
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Projects') {
      return shuffleArray(projects)
    }
    return projects.filter(project => project.category === selectedCategory)
  }, [selectedCategory])

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/background/5.png"
            alt="Our Projects"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
          {/* Watermark cover overlays */}
          <div className="absolute bottom-0 right-0 w-32 h-16 bg-gradient-to-tl from-black/90 via-black/80 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-16 bg-gradient-to-tr from-black/90 via-black/80 to-transparent z-10"></div>
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
                onClick={() => setSelectedCategory(category)}
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
                  {/* Watermark cover overlays */}
                  <div className="absolute bottom-0 right-0 w-28 h-14 bg-gradient-to-tl from-black/95 via-black/90 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 w-28 h-14 bg-gradient-to-tr from-black/95 via-black/90 to-transparent z-10"></div>
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
