'use client'

import { motion } from 'framer-motion'
import { Building2, MapPin, Zap, Home, Wrench, Users } from 'lucide-react'
import Image from 'next/image'

export default function ServicesSection() {
  const services = [
    {
      icon: Building2,
      title: "Road & Building Construction",
      description: "Expert road and building construction services specializing in highways, bridges, infrastructure, and commercial buildings.",
      features: ["Road Construction & Rehabilitation", "Bridge Engineering", "Building Construction", "Earthworks", "Drainage Structures"],
      image: "/background/9.png"
    },
    {
      icon: MapPin,
      title: "Water Work Construction",
      description: "Specialized water infrastructure development including water supply systems, treatment facilities, and distribution networks.",
      features: ["Water Supply Systems", "Treatment Plants", "Distribution Networks", "Water Storage Facilities", "Pump Installations"],
      image: "/background/10.png"
    },
    {
      icon: Home,
      title: "Real Estate Development",
      description: "Creating sustainable and quality living spaces with innovative designs and compound facilities including villas and apartments.",
      features: ["Residential Villas", "Apartment Complexes", "Community Building", "Compound Facilities", "Design & Build"],
      image: "/background/11.png"
    },
    {
      icon: Zap,
      title: "Rental of Machines",
      description: "Comprehensive equipment rental services including excavators, graders, compactors, and construction machinery.",
      features: ["Excavators & Dozers", "Motor Graders", "Roller Compactors", "Asphalt Pavers", "Truck Mixers"],
      image: "/background/12.png"
    },
    {
      icon: Building2,
      title: "Retails of Construction Materials",
      description: "Retail supply of quality construction materials including aggregates, concrete, asphalt, and building supplies.",
      features: ["Aggregates", "Concrete & Asphalt", "Building Materials", "Rebars & Steel", "Construction Supplies"],
      image: "/background/13.png"
    },
    {
      icon: Users,
      title: "Trading (Import & Export)",
      description: "Import and export of critical construction materials including bitumen, reinforcement bars, oils, lubricants, and construction inputs.",
      features: ["Bitumen Import", "Reinforcement Bars (Rebars)", "Oils & Lubricants", "Construction Materials", "Import & Export Services"],
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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-brand-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MACRO provides comprehensive construction, infrastructure, real estate development, 
            equipment rental, and trading services across Ethiopia.
          </p>
        </motion.div>

        {/* General Contracting Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 p-8 rounded-lg mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our General Contracting Responsibilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {responsibilities.map((responsibility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-600 text-white p-4 rounded-lg text-center font-semibold"
              >
                {responsibility}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-4 left-4 bg-brand-600 text-white p-3 rounded-lg">
                  <service.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-brand-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-brand-600 text-white p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Our General Contracting Services</h3>
          <p className="text-lg leading-relaxed">
            Our general contracting services help ensure that your project moves forward as smoothly as possible, 
            from pre-construction to finish. We'll guide you through the entire process, offering scheduling, 
            quality control, and supervision. We will also maintain our dedication to promoting a safe construction 
            site, and handle the many unique challenges that arise along the way.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
