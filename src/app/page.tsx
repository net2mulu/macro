import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import PartnersSection from '@/components/PartnersSection'
import TeamSection from '@/components/TeamSection'
import TestimonialSection from '@/components/TestimonialSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen pt-14">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PartnersSection />
      <TeamSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </main>
  )
}