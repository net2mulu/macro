import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, MapPin, Building, ArrowLeft, User, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProjectDetail {
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
}

const projectDetails: { [key: string]: ProjectDetail } = {
  'adaba-angetu-road': {
    id: 'adaba-angetu-road',
    title: 'Adaba Angetu Road Project',
    description: 'A major road construction project connecting Adaba Town in West Arsi Zone to Angetu Town in Bale Zone, Oromiya Region.',
    fullDescription: 'The Adaba Angetu Road Project is a critical infrastructure development linking two important towns in the Oromiya Region. This project encompasses the construction of a modern road network designed to improve connectivity, facilitate trade, and enhance transportation efficiency in the region. The road serves as a vital transportation corridor for local communities, agricultural products, and regional commerce.',
    location: 'Oromiya Region, West Arsi & Bale Zones',
    client: 'Ethiopian Roads Authority',
    date: 'February 22, 2018',
    tags: ['Active Projects', 'Road Construction', 'Infrastructure'],
    category: 'Road Construction',
    image: '/projects/Adaba Angetu Road project.jpg',
    status: 'Active',
    startingPoint: 'Adaba Town located in Oromiya Region, West Arsi Zone at approximately 7000\' Latitude and 39023\' Longitude.',
    endingPoint: 'Angetu Town located in Oromiya Region, Bale Zone at approximately 6024\' Latitude and 390 35\' Longitude.'
  },
  'warder-kebridehar-road': {
    id: 'warder-kebridehar-road',
    title: 'Warder Kebridehar Road Project',
    description: 'Road construction project connecting Kebridehar to Warder through multiple zones in the Somali Regional State.',
    fullDescription: 'The Warder-Kebridehar Road Project is a significant infrastructure initiative that connects two zones in the Somali Regional State, facilitating regional connectivity and economic development. The project road starts at Kebridehar as a junction to the left from the main paved road from Jiggiga to Gode, which is 410 km away from Jiggiga town and 1010 km away from Addis Ababa. The road passes through multiple kebeles including Elhar, Tondehelay, Kudunbur, Berchesale (Eyobe), Esmude, Harragubewafeduke, Huletage, culminating at Warder.',
    location: 'Somali Regional State, Qurhaeye & Dollo Zones',
    client: 'Ethiopian Roads Authority',
    date: 'February 22, 2018',
    tags: ['Active Projects', 'Road Construction', 'Regional Connectivity'],
    category: 'Road Construction',
    image: '/projects/warder kebridehar road project.jpg',
    status: 'Active',
    startingPoint: 'Kebridehar town as a junction to the main road from Jiggiga to Gode in Qurhey Zone',
    endingPoint: 'Warder, Dollo zone'
  },
  'addis-commercial-tower': {
    id: 'addis-commercial-tower',
    title: 'Addis Commercial Tower',
    description: 'Modern high-rise commercial complex in the heart of Addis Ababa featuring retail spaces, offices, and parking facilities.',
    fullDescription: 'The Addis Commercial Tower represents modern commercial development in Addis Ababa\'s prime business district. This high-rise complex features state-of-the-art office spaces, retail establishments, and comprehensive parking facilities. The project showcases MACRO\'s capability in delivering large-scale commercial developments that serve the growing business community in Ethiopia\'s capital.',
    location: 'Addis Ababa, Nifas Silk Lafto Sub city',
    client: 'Private Developer',
    date: '2020',
    tags: ['Completed', 'Commercial', 'Real Estate'],
    category: 'Real Estate Development',
    image: '/background/1.png',
    status: 'Completed'
  },
  'residential-complex-project': {
    id: 'residential-complex-project',
    title: 'Premium Residential Complex',
    description: 'Luxury residential development with 120+ units, modern amenities, and premium finishes in prime location.',
    fullDescription: 'Our Premium Residential Complex development represents the pinnacle of luxury living in Addis Ababa. With 120+ carefully designed residential units, this project offers modern amenities, premium finishes, and an exceptional living experience. Located in a prime area of Bole District, the complex features state-of-the-art facilities including fitness centers, community spaces, and secure parking.',
    location: 'Addis Ababa, Bole District',
    client: 'Premium Properties PLC',
    date: '2021',
    tags: ['Active Projects', 'Residential', 'Real Estate'],
    category: 'Real Estate Development',
    image: '/background/2.png',
    status: 'Active'
  },
  'bridge-construction-1': {
    id: 'bridge-construction-1',
    title: 'Highway Bridge Construction',
    description: 'Major bridge infrastructure project spanning critical river crossings for improved regional connectivity.',
    fullDescription: 'This major highway bridge construction project involved building critical infrastructure to span significant river crossings, dramatically improving regional connectivity. The bridge incorporates modern engineering standards, ensuring long-term durability and capacity for heavy traffic loads. This project demonstrates MACRO\'s expertise in complex infrastructure development.',
    location: 'Various Locations',
    client: 'Ethiopian Roads Authority',
    date: '2019',
    tags: ['Completed', 'Infrastructure', 'Bridge Construction'],
    category: 'Infrastructure',
    image: '/background/3.png',
    status: 'Completed'
  },
  'urban-highway-expansion': {
    id: 'urban-highway-expansion',
    title: 'Urban Highway Expansion',
    description: 'Expansion and modernization of major urban highways with enhanced safety features and modern infrastructure.',
    fullDescription: 'The Urban Highway Expansion project involves the comprehensive modernization and expansion of major transportation arteries within the Addis Ababa Metropolitan Area. This critical infrastructure project includes enhanced safety features, improved traffic flow, and modern infrastructure elements designed to meet the growing demands of Ethiopia\'s capital city.',
    location: 'Addis Ababa Metropolitan Area',
    client: 'Ministry of Urban Development',
    date: '2022',
    tags: ['Active Projects', 'Urban Development', 'Highways'],
    category: 'Road Construction',
    image: '/background/4.png',
    status: 'Active'
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectDetails[slug]

  if (!project) {
    notFound()
  }

  const relatedProjects = Object.values(projectDetails)
    .filter(p => p.id !== project.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white mb-8 hover:text-brand-300 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Projects</span>
          </Link>

          <div className="mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === 'Active' 
                ? 'bg-brand-600 text-white' 
                : 'bg-green-600 text-white'
            }`}>
              {project.status}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{project.description}</p>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {project.fullDescription}
                </p>

                {/* Key Features - Only show for road projects */}
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

              {/* Project Images */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/background/1.png"
                    alt="Project construction"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/background/2.png"
                    alt="Project progress"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/background/3.png"
                    alt="Infrastructure"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/background/4.png"
                    alt="Completed section"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Building className="h-5 w-5" />
                      <span className="font-medium">Category</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{project.category}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <User className="h-5 w-5" />
                      <span className="font-medium">Client</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{project.client}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">Date</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{project.date}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">Location</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{project.location}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-3 font-medium">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-brand-100 text-brand-700 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="block w-full bg-brand-600 hover:bg-brand-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Contact About This Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Related <span className="text-brand-600">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.id}
                href={`/projects/${relatedProject.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <Image
                    src={relatedProject.image}
                    alt={relatedProject.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{relatedProject.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
