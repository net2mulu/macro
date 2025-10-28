'use client'

import { motion } from 'framer-motion'
import { User, Mail, Phone } from 'lucide-react'

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Ato Elias Mammo",
      position: "General Manager",
      qualification: "B.Sc. Civil Engineering, Addis Ababa University",
      experience: "25 years",
      image: "/api/placeholder/300/300",
      description: "Leading MACRO with extensive experience in construction management and strategic planning."
    },
    {
      name: "Ato Asamnew Asfaw",
      position: "Manager",
      qualification: "B.Sc. Civil Engineering, Addis Ababa University",
      experience: "23 years",
      image: "/api/placeholder/300/300", 
      description: "Overseeing day-to-day operations and ensuring project delivery excellence."
    },
    {
      name: "Ato Gashaw Asaye",
      position: "Deputy Manager",
      qualification: "B.Sc. Agricultural Economics, Jimma University; M.Sc. Project Management",
      experience: "14 years",
      image: "/api/placeholder/300/300",
      description: "Supporting management operations and coordinating with various project teams."
    },
    {
      name: "Samuel Sultan Seid",
      position: "Engineering Head",
      qualification: "B.Sc. Civil Engineering, Gonder University",
      experience: "7 years",
      image: "/api/placeholder/300/300",
      description: "Leading engineering operations and technical project management."
    },
    {
      name: "Ato Aklilu Abera",
      position: "HR and Finance Head",
      qualification: "B.A. Accounting & Finance, Principal Health & College; Diploma from Mekelle University",
      experience: "21 years",
      image: "/api/placeholder/300/300",
      description: "Managing human resources and financial operations."
    },
    {
      name: "W/ro Mekdes Tsegaye",
      position: "Finance Head",
      qualification: "B.A. Accounting, Addis Ababa University; M.A. Accounting & Finance, Civil Service University",
      experience: "12 years",
      image: "/api/placeholder/300/300",
      description: "Managing financial operations and ensuring sound fiscal management across all projects."
    },
    {
      name: "Ato Abiy Teshome",
      position: "Equipment Head",
      qualification: "B.Sc. Automotive Technology, Adama University",
      experience: "16 years",
      image: "/api/placeholder/300/300",
      description: "Overseeing equipment management and maintenance operations."
    },
    {
      name: "Ato Tadios Girma",
      position: "HR Head",
      qualification: "B.A. Business Management, Infolink University",
      experience: "20 years",
      image: "/api/placeholder/300/300",
      description: "Leading human resources and administrative functions."
    }
  ]

  return (
    <section id="team" className="py-20 bg-gray-50">
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
            Meet Our <span className="text-brand-600">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Macro has the best talent with great experience in the construction industry. 
            Here are our top management professionals.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Profile Image */}
              <div className="relative h-64 bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <User className="h-24 w-24 text-white" />
              </div>
              
              {/* Profile Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-brand-600 font-semibold mb-2">{member.position}</p>
                <p className="text-gray-500 text-xs mb-2">{member.qualification}</p>
                <p className="text-brand-500 text-xs mb-3">{member.experience} Experience</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              At MACRO Construction we believe strongly in ensuring customer satisfaction. 
              This belief is reflected in the long-term relationships we have built with 
              multiple national projects. We are always striving to provide exceptional 
              general contracting, pre-construction, construction, and construction management 
              services to our clients.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
