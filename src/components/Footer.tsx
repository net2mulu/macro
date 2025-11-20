import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Image 
              src="/logo-white.png" 
              alt="MACRO Logo" 
              width={140} 
              height={70}
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-gray-300 mb-4">
              General Contractor & Trading PLC is a private limited construction 
              contracting and real-estate development firm established in November 1995.
            </p>
            <p className="text-gray-300">
              Grade I Road Contractor specializing in large infrastructure and building contracts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-brand-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-brand-500 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-brand-500 transition-colors">Services</Link></li>
              <li><Link href="/projects" className="text-gray-300 hover:text-brand-500 transition-colors">Projects</Link></li>
              <li><Link href="/realestate" className="text-gray-300 hover:text-brand-500 transition-colors">Real Estate</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-brand-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-500 mt-0.5" />
                <div>
                  <p className="text-gray-300">Nifas Silk Lafto Sub city</p>
                  <p className="text-gray-300">Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-500" />
                <div>
                  <a href="tel:+251114710591" className="text-gray-300 hover:text-brand-500 transition-colors block">+251 114 710 591</a>
                  <a href="tel:+251911202814" className="text-gray-300 hover:text-brand-500 transition-colors block">+251 911 202 814</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-500" />
                <a href="mailto:mail@macrogc.com" className="text-gray-300 hover:text-brand-500 transition-colors">mail@macrogc.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-brand-500" />
                <a href="https://wa.me/251911202814" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-500 transition-colors">+251 911 202 814</a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-brand-500" />
                <div>
                  <p className="text-gray-300">Mon-Fri: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-300">Saturday: 8:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} MACRO General Contractor & Trading PLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}


