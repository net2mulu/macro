'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      name: "Elias Mamo",
      position: "Project Director",
      company: "Ethiopian Roads Authority",
      content: "MACRO has consistently delivered exceptional quality in all our construction projects. Their attention to detail and commitment to excellence sets them apart in the industry.",
      rating: 5,
      project: "Highway Construction Project"
    },
    {
      name: "Samuel Kebede",
      position: "Infrastructure Manager",
      company: "Ministry of Urban Development",
      content: "Working with MACRO has been a pleasure. Their team's professionalism and expertise in handling large infrastructure projects is unmatched.",
      rating: 5,
      project: "Infrastructure Development"
    },
    {
      name: "Mekdes Tsegaye",
      position: "Real Estate Developer",
      company: "Premium Properties PLC",
      content: "MACRO transformed our vision into reality. The quality of their work and their dedication to meeting deadlines made them our go-to construction partner.",
      rating: 5,
      project: "Commercial Complex Development"
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setDirection(1)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setDirection(1)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setDirection(-1)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 mb-4">
            <Quote className="h-8 w-8 text-brand-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-brand-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See what our satisfied clients have to say about working with MACRO.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative mb-12">
          <div className="relative overflow-hidden rounded-lg" style={{ minHeight: '400px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-gray-50 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 max-w-4xl mx-auto"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left side - Content */}
                  <div className="flex-1">
                    {/* Quote Icon */}
                    <div className="flex justify-start mb-4">
                      <Quote className="h-10 w-10 text-brand-600 opacity-50" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-brand-500 text-brand-500" />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </p>

                    {/* Project Info */}
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500 mb-2 font-semibold">
                        {testimonials[currentIndex].project}
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="mt-4">
                      <p className="font-semibold text-gray-900">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-gray-600">{testimonials[currentIndex].position}</p>
                      <p className="text-sm text-brand-600">{testimonials[currentIndex].company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-brand-600" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-brand-600" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setDirection(index > currentIndex ? 1 : -1)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-brand-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-brand-600 text-white rounded-lg p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-sm text-brand-100">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-sm text-brand-100">Completed Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm text-brand-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-brand-100">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
