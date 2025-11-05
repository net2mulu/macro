'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Shield, Award } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  const features = [
    {
      icon: Target,
      title: "Expert Team",
      description: "Our skilled team of experts is ready to guide you through the comprehensive construction process, including the finer details, so you have a complete understanding of your project."
    },
    {
      icon: Shield,
      title: "Safety & Reliability",
      description: "From licensing and insurance to knowing which subcontractors, suppliers, and supervisors are working on the site at all times, we ensure all safety measures are in place."
    },
    {
      icon: Eye,
      title: "Your Project is OUR Project",
      description: "Every project is as important to us as it is to you. From new construction to detailed renovations, we keep an eye on your needs, your vision, and employee safety."
    },
    {
      icon: Award,
      title: "Integrity & Value",
      description: "Thanks to extensive industry knowledge and strong relationships with subcontractors and vendors, we have the assistance you need at a cost-competitive value."
    }
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
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
            About <span className="text-brand-600">MACRO</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A private limited construction contracting and real-estate development firm 
            established in November 1995, specializing in large infrastructure and building contracts.
          </p>
        </motion.div>

        {/* Mission & Vision with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src="/background/3.png"
                alt="Our Mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To build enduring value through quality infrastructure, innovative construction inputs, 
                and strategic real estate developments by:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2">✓</span>
                  <span>Upholding professional integrity and engineering excellence in every project</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2">✓</span>
                  <span>Utilizing advanced technology and industry best practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2">✓</span>
                  <span>Developing reliable local supply chains for bitumen, aggregates, and asphalt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2">✓</span>
                  <span>Creating strong partnerships with government, financiers, and global investors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-600 mr-2">✓</span>
                  <span>Contributing to Ethiopia's transformation through real estate and PPPs</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src="/right/1.png"
                alt="Our Vision"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To stand among Africa's most trusted and diversified infrastructure and construction 
                solution providers — delivering excellence in engineering, real estate, and industrial 
                production while driving Ethiopia's sustainable development and regional competitiveness.
              </p>
              <p className="text-sm text-gray-500 mt-4 italic">
                "Building Ethiopia's Foundation, Powering Its Future."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our <span className="text-brand-600">Core Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Integrity",
                description: "We deliver on our promises with honesty, fairness, and accountability"
              },
              {
                icon: Shield,
                title: "Excellence",
                description: "Quality is our foundation; innovation is our drive"
              },
              {
                icon: "Sustainability",
                title: "Sustainability",
                description: "We build responsibly for future generations"
              },
              {
                icon: "Partnership",
                title: "Partnership",
                description: "We grow through collaboration, both locally and internationally"
              },
              {
                icon: "Commitment",
                title: "Commitment",
                description: "Our people and our performance define our reliability"
              },
              {
                icon: "Legacy",
                title: "Legacy",
                description: "Over 30 years of proven delivery, experience, and trust"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose <span className="text-brand-600">MACRO</span>?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-brand-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quality Objective */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-brand-600 text-white p-8 rounded-lg text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Quality Objective</h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            Macro has placed adhering to and maintaining the highest quality standards at the core of its business. 
            All construction contracts are led with the primary aim of adhering to a strict set of quality assurance 
            and quality control procedures which are custom-made at the start of respective projects.
          </p>
        </motion.div>
      </div>
    </section>
  )
}


