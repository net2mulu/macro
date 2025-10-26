'use client'

import { motion } from 'framer-motion'
import { Building2, MapPin, Zap, Home, Wrench, Users } from 'lucide-react'
import Image from 'next/image'

export default function ServicesSection() {
  const services = [
    {
      icon: Building2,
      title: "Real Estate Construction",
      description: "Complete construction services for residential and commercial real estate projects, from planning to completion.",
      features: ["Residential Buildings", "Commercial Complexes", "Mixed-Use Developments"],
      image: "/background/1.png"
    },
    {
      icon: MapPin,
      title: "Road Construction",
      description: "Expert road construction services including highways, urban roads, and rural access roads.",
      features: ["Highway Construction", "Urban Roads", "Rural Access Roads"],
      image: "/background/2.png"
    },
    {
      icon: Zap,
      title: "Bridge Construction",
      description: "Specialized bridge construction and infrastructure development for transportation networks.",
      features: ["Highway Bridges", "Pedestrian Bridges", "Infrastructure Bridges"],
      image: "/background/3.png"
    },
    {
      icon: Wrench,
      title: "General Contracting",
      description: "Comprehensive general contracting services ensuring smooth project execution from start to finish.",
      features: ["Project Management", "Subcontractor Coordination", "Quality Control"],
      image: "/background/4.png"
    },
    {
      icon: Users,
      title: "Construction Management",
      description: "Professional construction management services for complex projects requiring expert oversight.",
      features: ["Project Planning", "Resource Management", "Timeline Coordination"],
      image: "/background/5.png"
    },
    {
      icon: Home,
      title: "Real Estate Development",
      description: "End-to-end real estate development services from land acquisition to project delivery.",
      features: ["Land Development", "Property Development", "Investment Projects"],
      image: "/background/6.png"
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
            We are a construction management and consulting company targeting government 
            and commercial entities in a variety of industry sectors.
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
