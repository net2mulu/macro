'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', text: string }>>([
    { type: 'bot', text: 'Hello! I\'m MACRO\'s AI assistant. How can I help you today? I can answer questions about our services, projects, or direct you to the right contact.' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { type: 'user' as const, text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(input)
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }])
    }, 500)
  }

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    // Service-related questions
    if (lowerInput.includes('service') || lowerInput.includes('what do you do')) {
      return 'We offer comprehensive construction services including: Road & Building Construction, Water Work Construction (including Irrigation Designing & Development), Real Estate Development, Rental of Machines, Construction Materials Production & Supply, and Trading (Import & Wholesale). Would you like more details about any specific service?'
    }

    // Project-related questions
    if (lowerInput.includes('project') || lowerInput.includes('completed')) {
      return 'We have completed 200+ projects over 30 years and currently have 10-15 active projects. Our projects include major road construction, bridges, and infrastructure development across Ethiopia. Would you like to see our project portfolio?'
    }

    // Contact-related questions
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('address')) {
      return 'You can reach us at:\n• Phone: +251 11 471 0591 / +251 11 419 8159\n• WhatsApp: +251 911 20 28 14\n• Email: mail@macrogc.com\n• Address: P.O.Box 122479, Lafto Sub city, Addis Ababa, Ethiopia\n• Business Hours: Mon-Fri 8:00 AM - 5:00 PM, Saturday 8:00 AM - 12:00 PM'
    }

    // About-related questions
    if (lowerInput.includes('about') || lowerInput.includes('who are you') || lowerInput.includes('company')) {
      return 'MACRO General Contractor & Trading PLC is a Grade I construction contractor established in 1995. We specialize in large infrastructure projects, road construction, real estate development, and construction materials. We have 30+ years of experience delivering excellence across Ethiopia.'
    }

    // Real estate questions
    if (lowerInput.includes('real estate') || lowerInput.includes('property') || lowerInput.includes('apartment') || lowerInput.includes('villa')) {
      return 'We develop residential villas, apartment complexes, and commercial properties with modern designs and premium amenities. Our real estate projects feature sustainable construction, secure parking, and community facilities. Would you like to know more about our current developments?'
    }

    // Default response
    return 'Thank you for your question! For more detailed information, please contact our general information desk at mail@macrogc.com or call +251 11 471 0591. Our team will route your inquiry to the appropriate department. Is there anything else I can help you with?'
  }

  const quickQuestions = [
    'What services do you offer?',
    'How many projects have you completed?',
    'What are your contact details?',
    'Tell me about your company'
  ]

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg z-50 transition-colors duration-300 flex items-center justify-center"
            aria-label="Open chatbot"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-brand-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-semibold">MACRO AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-brand-700 rounded-full p-1 transition-colors"
                aria-label="Close chatbot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-brand-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white p-2 rounded-lg transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

