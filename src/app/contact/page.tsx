"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+251 11 471 0591", "+251 911 20 28 14 (MD)"],
      color: "text-blue-600",
      links: ["tel:+251114710591", "tel:+251911202814"],
    },
    {
      icon: Phone,
      title: "WhatsApp",
      details: ["+251 911 20 28 14"],
      color: "text-green-600",
      links: ["https://wa.me/251911202814"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["mail@macrogc.com"],
      color: "text-green-600",
      links: ["mailto:mail@macrogc.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["P.O.Box 122479", "Lafto Sub city, Addis Ababa", "Ethiopia"],
      color: "text-red-600",
      links: [],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 5:00 PM", "Saturday: 8:00 AM - 12:00 PM"],
      color: "text-purple-600",
      links: [],
    },
  ];

  const departments = [
    {
      title: "General Information",
      description:
        "For all inquiries and general information. Our team will route your concerns to the respective working units through our relationship/office manager.",
      contact: "mail@macrogc.com",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/background/6.png"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
            Ready to start your next construction project? Contact us today for
            a consultation and let us help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`bg-gray-100 p-3 rounded-lg ${info.color}`}>
                    <info.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h4>
                    {info.details.map((detail, detailIndex) => {
                      const link = info.links && info.links[detailIndex];
                      if (link) {
                        return (
                          <a
                            key={detailIndex}
                            href={link}
                            target={
                              link.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              link.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-gray-600 hover:text-brand-600 transition-colors text-sm block"
                          >
                            {detail}
                          </a>
                        );
                      }
                      return (
                        <p key={detailIndex} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Contact */}
          <div className="max-w-2xl mx-auto">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-brand-600"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {dept.title}
                </h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <p className="text-brand-600 font-semibold">{dept.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="+251 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="Project inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 text-lg"
                >
                  <Send className="h-6 w-6" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <div className="bg-brand-600 text-white p-8 rounded-lg mb-6">
                <h3 className="text-2xl font-bold mb-6">
                  Additional Contact Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Telephone:</p>
                    <p>+251 11 471 0591</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">WhatsApp:</p>
                    <a
                      href="https://wa.me/251911202814"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      +251 911 20 28 14
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Fax:</p>
                    <p>+251 11 419 8160</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Managing Director:</p>
                    <p>Ato Elias Mammo</p>
                    <p>
                      Mobile:{" "}
                      <a href="tel:+251911202814" className="hover:underline">
                        +251 911 20 28 14
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Website:</p>
                    <p>www.macrogc.com</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Registration:</p>
                    <p>14 November 1995, Addis Ababa</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose MACRO?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">✓</span>
                    <span className="text-gray-700">
                      Grade I Road Contractor certified by Ministry of Urban
                      Development
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">✓</span>
                    <span className="text-gray-700">
                      30+ years of experience in construction and real estate
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">✓</span>
                    <span className="text-gray-700">
                      200+ successfully completed projects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">✓</span>
                    <span className="text-gray-700">
                      Comprehensive services from planning to completion
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 mr-2">✓</span>
                    <span className="text-gray-700">
                      Dedicated to quality, safety, and customer satisfaction
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
