import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Building2, MapPin, Zap, Home, Wrench, Users, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: "Road & Building Construction",
      description: "Expert road and building construction services specializing in highways, bridges, infrastructure, and commercial buildings.",
      features: ["Road Construction & Rehabilitation", "Bridge Engineering", "Building Construction", "Earthworks", "Drainage Structures"],
      image: "/WarderKebrideharRoadProject/Picture21.png"
    },
    {
      icon: MapPin,
      title: "Water Work Construction",
      description: "Specialized water infrastructure development including water supply systems, treatment facilities, and distribution networks.",
      features: ["Water Supply Systems", "Treatment Plants", "Distribution Networks", "Water Storage Facilities", "Pump Installations", "Irrigation Designing & Development"],
      image: "/beto/Picture13.png"
    },
    {
      icon: Home,
      title: "Real Estate Development",
      description: "Creating sustainable and quality living spaces with innovative designs and compound facilities including villas and apartments.",
      features: ["Residential Villas", "Apartment Complexes", "Community Building", "Compound Facilities", "Design & Build"],
      image: "/RealEstateApartment/picture5.pn"
    },
    {
      icon: Zap,
      title: "Rental of Machines",
      description: "Comprehensive equipment rental services including excavators, graders, compactors, and construction machinery.",
      features: ["Excavators & Dozers", "Motor Graders", "Roller Compactors", "Asphalt Pavers", "Truck Mixers"],
      image: "/BurayuSub-CityCorridor/picOne.jpg"
    },
    {
      icon: Building2,
      title: "Construction Materials Production & Supply",
      description: "Production and supply of quality construction materials including aggregates, concrete, asphalt, and building supplies.",
      features: ["Aggregates", "Concrete & Asphalt", "Building Materials", "Rebars & Steel", "Construction Supplies"],
      image: "/background/13.png"
    },
    {
      icon: Users,
      title: "Trading (Import & Wholesale)",
      description: "Import and wholesale of critical construction materials including bitumen, reinforcement bars, oils, lubricants, and construction inputs.",
      features: ["Bitumen Import", "Reinforcement Bars (Rebars)", "Oils & Lubricants", "Construction Materials", "Import & Wholesale Services"],
      image: "/background/14.png"
    }
  ]

  const responsibilities = [
    "HIRING SUBCONTRACTORS",
    "SELECTING SUPPLIERS", 
    "SUPERVISING EACH STEP OF THE WORK",
    "IMPLEMENT PROJECTS WITH OUR OWN RESOURCES"
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/BurayuSub-CityCorridor/picThree.jpg"
            alt="Construction background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
              Your trusted partner for construction, infrastructure, real estate development, 
              equipment rental, and trading services across Ethiopia
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  {/* Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-white rounded-full p-4">
                      <service.icon className="h-12 w-12 text-brand-600" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 text-brand-600 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our General Contracting <span className="text-brand-600">Responsibilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are involved throughout the building process and in charge of the successful completion of your project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {responsibilities.map((responsibility, index) => (
              <div
                key={index}
                className="bg-brand-600 text-white p-6 rounded-lg text-center font-semibold hover:bg-brand-700 transition-colors duration-300"
              >
                {responsibility}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Description */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">How We Work</h2>
            <p className="text-xl leading-relaxed mb-8">
              Our general contracting services help ensure that your project moves forward as smoothly as possible, 
              from pre-construction to finish. We'll guide you through the entire process, offering scheduling, 
              quality control, and supervision.
            </p>
            <p className="text-lg leading-relaxed">
              We will also maintain our dedication to promoting a safe construction site, and handle the many 
              unique challenges that arise along the way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact us today for a consultation and let us help bring your vision to life.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
