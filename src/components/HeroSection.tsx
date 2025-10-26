'use client'

import { ArrowRight, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev % 6) + 1)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src={`/background/${currentImage}.png`}
          alt="Construction background"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/60 to-black/70"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <span className="text-gray-300 font-semibold">SINCE 1995</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="block text-white drop-shadow-lg">Building</span>
              <span className="block text-brand-400">Tomorrow</span>
              <span className="block text-white">Today</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-xl leading-relaxed"
            >
              Leading construction contracting and real-estate development firm 
              with <span className="font-semibold text-white">30+ years</span> of excellence in large 
              infrastructure and building projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group shadow-2xl">
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white/90 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                Our Services
              </button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold text-brand-400">30+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-brand-400">200+</div>
                <div className="text-sm text-gray-300">Projects Done</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-brand-400">Grade I</div>
                <div className="text-sm text-gray-300">Certified</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <Image
                src={`/background/${(currentImage % 6) + 2}.png`}
                alt="Construction project"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
