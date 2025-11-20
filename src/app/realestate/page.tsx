import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Building2, Calendar, Layout, Car, CheckCircle, Shield, MapPin, ArrowRight, Award, Eye, Home, Recycle, Heart, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function RealEstatePage() {
  const features = [
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Strategically located in key areas of Addis Ababa with easy access to amenities"
    },
    {
      icon: Award,
      title: "Award-Winning Design",
      description: "Modern architectural designs that blend functionality with aesthetic appeal"
    },
    {
      icon: Eye,
      title: "Spectacular Views",
      description: "Panoramic city views and natural landscapes from every unit"
    },
    {
      icon: Home,
      title: "Smart Apartments",
      description: "Contemporary living spaces designed for modern lifestyles"
    },
    {
      icon: Recycle,
      title: "Sustainable Materials",
      description: "Eco-friendly construction with high-quality, durable materials"
    },
    {
      icon: Heart,
      title: "Premium Amenities",
      description: "Exclusive club facilities and wellness centers for residents"
    },
    {
      icon: Car,
      title: "Secure Parking",
      description: "Underground parking spaces with 24/7 security surveillance"
    },
    {
      icon: Shield,
      title: "Priority Security",
      description: "Round-the-clock security systems and controlled access"
    }
  ]

  const amenities = [
    "Reception Area",
    "Modern Lobby",
    "Fitness & Wellness Center",
    "CCTV Surveillance",
    "24/7 Security Service",
    "Elevator Access",
    "Parking per Unit",
    "Landscaped Gardens",
    "Commercial Spaces",
    "Community Areas"
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/right/4.png"
            alt="Real Estate Development"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
         
         
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Real Estate <span className="text-brand-300">Development</span>
              </h1>
              <p className="text-xl text-white max-w-2xl mb-8 drop-shadow-lg">
                MACRO Real Estate is engaged in building villas and apartments with peculiar designs. 
                We provide quality housing and create safe, favorable, and attractive environments 
                with full compound facilities.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/#contact"
                  className="bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Request Info
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/#contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-600 transition-all duration-300"
                >
                  Schedule Visit
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <div className="relative">
                  <Image
                    src="/right/4.png"
                    alt="Residential Development"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                  {/* Watermark cover logo - bottom right only */}
                  <div className="absolute bottom-[-13px] right-[-13px] z-20">
                    <Image
                      src="/right/o.png"
                      alt="MACRO Logo"
                      width={85}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">MACRO Real Estate Project</h2>
            <p className="text-lg text-gray-600">CMC, Summit area</p>
            <p className="text-sm text-gray-500">Total Area: 5,169.00 square meter</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold text-brand-600 mb-2">6</div>
              <div className="text-lg font-semibold text-gray-700">Villas</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-brand-600 mb-2">2</div>
              <div className="text-lg font-semibold text-gray-700">Apartment Buildings</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-brand-600 mb-2">5,169</div>
              <div className="text-lg font-semibold text-gray-700">Sq Metres Total Area</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-brand-600 mb-2">DELIVERED</div>
              <div className="text-lg font-semibold text-gray-700">Project Status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 mb-4">
              <Building2 className="h-8 w-8 text-brand-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The <span className="text-brand-600">Concept</span> of Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our real estate developments combine modern living with exceptional quality. 
              Each project is meticulously designed to offer the perfect blend of comfort, 
              luxury, and functionality for discerning homeowners and investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-4">
                PREMIUM AMENITIES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Wide Range of Amenities and Luxury
              </h2>
              <p className="text-xl mb-8 text-brand-100">
                Our developments feature a comprehensive range of amenities designed 
                to enhance your quality of life and provide convenience at every turn.
              </p>
              
              <ul className="space-y-3">
                {amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-lg">
                    <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/background/3.png"
                alt="Modern Amenities"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types of Units */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Residential <span className="text-brand-600">Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our variety of thoughtfully designed residential units
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Villa Type A (DELIVERED)",
                subtitle: "3 Villas",
                image: "/background/5.png",
                specs: "Average plot Area = 250 sqm, Building Type = G+1",
                features: ["3 bedrooms with private bathroom", "Common bathroom", "Balcony", "Kitchen", "Service quarter with bed room", "Family room"]
              },
              {
                title: "Villa Type B (DELIVERED)",
                subtitle: "1 Villa",
                image: "/background/8.png",
                specs: "Average plot Area = 250 sqm, Building Type = G+2",
                features: ["3 bedrooms with private bathroom", "Common bathroom", "Balcony", "Terrace", "Office", "Family room", "Kitchen"]
              },
              {
                title: "Villa Type C (DELIVERED)",
                subtitle: "2 Villas",
                image: "/background/7.png",
                specs: "Average plot Area = 250 sqm, Building Type = G+2",
                features: ["3 bedrooms with private bathroom", "Common bathroom", "Balcony", "Terrace", "Office", "Family room", "Kitchen"]
              }
            ].map((unit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={unit.image}
                    alt={unit.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{unit.title}</h3>
                  <p className="text-brand-600 font-semibold mb-3">{unit.subtitle}</p>
                  <p className="text-sm text-gray-600 mb-4">{unit.specs}</p>
                  <ul className="space-y-2">
                    {unit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="h-5 w-5 text-brand-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Apartment Buildings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              {
                title: "Apartment Building I (DELIVERED)",
                // subtitle: "G+4 with 2 wings - 5 apartments per floor per wing",
                image: "/background/6.png",
                specs: "Average plot Area = 650 square meter, Building Type = G+4 with 2 wings",
                features: ["3 Bed Room units", "2 Bed Room units", "1 Bed Room units", "Studio units", "Each with kitchen", "Bedroom and living room", "Bathrooms", "Common Biogas System", "Car Parking Area"]
              },
              {
                title: "Apartment Building II (DELIVERED)",
                // subtitle: "G+4 with 2 wings - 7 apartments per floor per wing",
                image: "/background/1.png",
                specs: "Average plot Area = 870 square meter, Building Type = G+4 with 2 wings",
                features: ["3 Bed Room units", "2 Bed Room units", "1 Bedroom units", "Studio units", "Each with kitchen", "Bedroom and living room", "Bathrooms", "Common Biogas system", "Car Parking"]
              }
            ].map((unit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={unit.image}
                    alt={unit.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{unit.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{unit.specs}</p>
                  <ul className="space-y-2">
                    {unit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="h-5 w-5 text-brand-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Find Your New Home?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact us today to schedule a viewing and discover what makes our real estate 
            developments special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call Us Now
            </Link>
            <Link
              href="/#contact"
              className="border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              Send Email
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
