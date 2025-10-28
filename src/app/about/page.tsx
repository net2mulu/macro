import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Building2, Target, Eye, Shield, Award, MapPin, Calendar, Users } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const stats = [
    { icon: Calendar, label: "Years of Experience", value: "30+", description: "Established in 1995" },
    { icon: Building2, label: "Completed Projects", value: "200+", description: "Successfully delivered" },
    { icon: Users, label: "Happy Clients", value: "50+", description: "Satisfied customers" },
    { icon: Award, label: "Grade I Certification", value: "100%", description: "Quality assured" },
  ]

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide domestic and international construction services through innovative and optimal utilization of state-of-the-art technologies in a quality-focused, result-oriented, financially sound, and socially and environmentally responsible manner."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "Macro aims to establish itself as a competent and recognizable civil works general contractor in Ethiopia and beyond. We aim to turn the construction business into a commercial success and establish mutually beneficial long-term partnership relationships."
    },
    {
      icon: Shield,
      title: "Quality Objective",
      description: "Macro has placed adhering to and maintaining the highest quality standards at the core of its business. All construction contracts are led with strict quality assurance and quality control procedures custom-made at the start of respective projects."
    },
    {
      icon: Award,
      title: "Our Commitment",
      description: "At MACRO Construction we believe strongly in ensuring customer satisfaction. This belief is reflected in the long-term relationships we have built with multiple national projects."
    }
  ]

  const responsibilities = [
    "HIRING SUBCONTRACTORS",
    "SELECTING SUPPLIERS", 
    "SUPERVISING EACH STEP OF THE WORK",
    "IMPLEMENT PROJECTS WITH OUR OWN RESOURCES"
  ]

  return (
    <main className="min-h-screen pt-14">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/background/1.png"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About MACRO</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
              A leading construction contractor and real-estate development firm 
              established in November 1995
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 mb-4">
                  <stat.icon className="h-8 w-8 text-brand-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Director Message */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">
              Building Ethiopia's Foundation, Powering Its Future
            </h2>
            <h3 className="text-2xl font-semibold mb-8 text-center text-brand-200">
              A Message from the Managing Director
            </h3>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="font-semibold">Dear Valued Partners, Investors, and Stakeholders,</span>
              </p>
              <p>
                It is with immense pride and a clear vision for the future that I present to you the profile of 
                Macro General Contractor & Trading Plc.
              </p>
              <p>
                For nearly three decades, since our inception in 1995, Macro has been a cornerstone of Ethiopia's 
                infrastructure development. Our journey, paved with the successful completion of challenging road 
                and bridge projects, has been guided by an unwavering commitment to quality, timely delivery, and integrity. 
                We are grateful for the trust placed in us by the Ethiopian government and people, which has allowed us to 
                become a recognized Grade One contractor.
              </p>
              <p>
                This is why we are not just reflecting on our past achievements but are energetically building our future. 
                We are strategically expanding our mission to embrace new horizons. Our foray into construction materials 
                trading, our readiness for Public-Private Partnerships (PPPs) in housing, and our investment in crusher 
                and batching plants are not mere diversifications; they are a strategic evolution.
              </p>
              <p>
                We believe in partnership. We believe in growth through collaboration. We are actively seeking to build 
                bridges with investors, technology providers, and international firms who share our vision for a developed 
                and prosperous Ethiopia.
              </p>
              <p className="mt-6">
                <span className="font-semibold">Sincerely,</span><br />
                Ato Elias Mammo<br />
                Managing Director
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are: A Legacy of Building Ethiopia</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MACRO General Contractor & Trading PLC is a premier, privately-owned construction and 
                  infrastructure development firm founded in November 1995. Registered as a Grade One Contractor 
                  by the Ministry of Urban Development and Construction, we have spent nearly 30 years shaping 
                  the landscape of Ethiopia through major road and bridge projects.
                </p>
                <p>
                  Our reputation is built on a foundation of technical excellence, a highly skilled team, and a 
                  fleet of modern equipment, enabling us to consistently deliver complex projects on time and to 
                  the highest standards.
                </p>
                <p>
                  From its strong core, Macro is now evolving into a diversified, integrated infrastructure solutions provider.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-brand-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">Nifas Silk Lafto Sub city, Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Calendar className="h-6 w-6 text-brand-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Established</h3>
                    <p className="text-gray-600">November 1995</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-brand-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Certification</h3>
                    <p className="text-gray-600">Grade I Road Contractor</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Building2 className="h-6 w-6 text-brand-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Specialization</h3>
                    <p className="text-gray-600">Civil Works & Real Estate Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values <span className="text-brand-600">& Commitment</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-600 text-white mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose MACRO?</h2>
          
          <div className="mb-12">
            <p className="text-xl text-center mb-8 max-w-4xl mx-auto">
              We are involved throughout the building process. We are in charge of the successful 
              completion of the project.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {responsibilities.map((responsibility, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <p className="font-semibold text-lg">{responsibility}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Our General Contracting Services</h3>
            <p className="leading-relaxed">
              Our general contracting services help ensure that your project moves forward as smoothly as possible, 
              from pre-construction to finish. We'll guide you through the entire process, offering scheduling, 
              quality control, and supervision. We will also maintain our dedication to promoting a safe 
              construction site, and handle the many unique challenges that arise along the way.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
