'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  MapPin,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Send,
  Phone,
  Mail,
  SearchX,
} from 'lucide-react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useVacancy } from '@/hooks/useVacancies'
import { submitVacancyApplication, VacancyApplicationPayload } from '@/lib/vacancies'

const formatDate = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const initialForm: VacancyApplicationPayload = {
  vacancy: 0,
  full_name: '',
  nationality: '',
  phone_number: '',
  email: '',
  birth_date: '',
  sex: 'male',
  place_of_birth: '',
  education_background: '',
  short_courses: '',
  work_history: '',
  current_address: '',
  sub_city: '',
  woreda: '',
  reference_1: '',
  reference_2: '',
  reference_3: '',
}

export default function VacancyDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const vacancyId = params?.id
  const { data: vacancy, isLoading, error } = useVacancy(vacancyId)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<VacancyApplicationPayload>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const descriptionParagraphs = useMemo(() => {
    if (!vacancy?.description) return []
    return vacancy.description.split('\n').filter((p) => p.trim().length > 0)
  }, [vacancy?.description])

  useEffect(() => {
    if (vacancy) {
      setFormData((prev) => ({ ...prev, vacancy: vacancy.id }))
    }
  }, [vacancy])

  const handleFormChange = (field: keyof VacancyApplicationPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!vacancy) return
    setSubmitting(true)
    setSubmitMessage(null)
    try {
      await submitVacancyApplication({ ...formData, vacancy: vacancy.id })
      setSubmitMessage({ type: 'success', text: 'Application submitted successfully.' })
      setFormData({ ...initialForm, vacancy: vacancy.id })
      setShowForm(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit application.'
      setSubmitMessage({ type: 'error', text: message })
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
              <span>Loading vacancy...</span>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (error || !vacancy) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="py-24 bg-gray-50 min-h-[60vh] flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
                <SearchX className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Vacancy not found</h2>
              <p className="text-gray-600 mb-8">
                The position you are looking for might have been closed or removed.
              </p>
              <button
                onClick={() => router.push('/vacancies')}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
              >
                <Briefcase className="h-4 w-4" /> View all vacancies
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }


  const backgrounds = [
    '/background/projects/1758479191848_BG__desktop_.webp',
    '/background/projects/1758479668013_LandingPageAds_Desktop_.webp',
    '/background/projects/Adaba%20Angetu%20Road%20project.jpg',
    '/background/projects/warder%20kebridehar%20road%20project.jpg',
  ]
  const bgIndex = vacancy ? vacancy.id % backgrounds.length : 0
  const activeBackground = backgrounds[bgIndex]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="relative text-white min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={activeBackground}
            alt="Vacancy Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full md:bg-transparent md:hover:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none"
            >
              <div className="hidden md:block p-2 rounded-full bg-white/10 group-hover:bg-brand-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <ArrowLeft className="md:hidden h-4 w-4" />
              <span className="text-sm font-medium">Back to vacancies</span>
            </button>
            
            <div className="flex flex-wrap items-center gap-3 text-brand-300 font-semibold tracking-wide uppercase text-xs md:text-sm mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-600/20 border border-brand-500/30 backdrop-blur-sm">
                {vacancy.employmentType || 'Full-time'}
              </span>
              <span className="hidden md:block h-1 w-1 rounded-full bg-brand-300"/>
              <span>{vacancy.location || 'Flexible Location'}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl drop-shadow-lg">
              {vacancy.title}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg md:bg-transparent md:backdrop-blur-none md:p-0">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-brand-400" />
                <span>Posted: <span className="font-medium text-white">{formatDate(vacancy.postedAt)}</span></span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg md:bg-transparent md:backdrop-blur-none md:p-0">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-brand-400" />
                <span>Deadline: <span className="font-medium text-white">{formatDate(vacancy.deadline)}</span></span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-brand-400" />
                <span>ID: <span className="font-medium text-white">#{vacancy.id}</span></span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative -mt-20 z-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Role overview</h2>
                {descriptionParagraphs.length === 0 ? (
                  <p className="text-gray-600">No description available.</p>
                ) : (
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    {descriptionParagraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Key details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="space-y-1">
                    <p className="text-gray-500">Location</p>
                    <p className="font-semibold">{vacancy.location || 'Flexible'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Employment type</p>
                    <p className="font-semibold">{vacancy.employmentType || 'Full-time'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Salary range</p>
                    <p className="font-semibold">
                      {vacancy.salaryMin || vacancy.salaryMax
                        ? `ETB ${vacancy.salaryMin?.toLocaleString?.() || ''}${
                            vacancy.salaryMax ? ` - ETB ${vacancy.salaryMax.toLocaleString?.()}` : '+'
                          }`
                        : 'Competitive'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Status</p>
                    <p className="font-semibold">{vacancy.status?.toUpperCase() || 'OPEN'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-24 h-fit">
              {submitMessage && (
                <div
                  className={`p-4 rounded-xl border ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {submitMessage.type === 'success' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <p className="font-semibold">{submitMessage.text}</p>
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase text-gray-500 tracking-wide">Apply now</p>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">Ready to join?</h3>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  Complete the quick form to apply. We will reach out if your profile matches the role.
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-600/20 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" /> Apply for this position
                </button>

                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="p-2 rounded-full bg-brand-50 text-brand-600">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Call us</p>
                      <p className="font-semibold text-gray-900">+251 (0)11 000 0000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                     <div className="p-2 rounded-full bg-brand-50 text-brand-600">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email us</p>
                      <p className="font-semibold text-gray-900">hr@macrogc.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
              aria-label="Close form"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply for {vacancy.title}</h3>
            <p className="text-sm text-gray-600 mb-6">
              Please provide accurate details. Fields marked with * are required.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full name *</label>
                  <input
                    required
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleFormChange('full_name', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nationality *</label>
                  <input
                    required
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleFormChange('nationality', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone number *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleFormChange('phone_number', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Birth date</label>
                  <input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => handleFormChange('birth_date', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Sex</label>
                  <select
                    value={formData.sex}
                    onChange={(e) => handleFormChange('sex', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Place of birth</label>
                  <input
                    type="text"
                    value={formData.place_of_birth}
                    onChange={(e) => handleFormChange('place_of_birth', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Current address</label>
                  <input
                    type="text"
                    value={formData.current_address}
                    onChange={(e) => handleFormChange('current_address', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Sub city</label>
                  <input
                    type="text"
                    value={formData.sub_city}
                    onChange={(e) => handleFormChange('sub_city', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Woreda</label>
                  <input
                    type="text"
                    value={formData.woreda}
                    onChange={(e) => handleFormChange('woreda', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Education background</label>
                  <textarea
                    value={formData.education_background}
                    onChange={(e) => handleFormChange('education_background', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Short courses</label>
                  <textarea
                    value={formData.short_courses}
                    onChange={(e) => handleFormChange('short_courses', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Work history</label>
                <textarea
                  value={formData.work_history}
                  onChange={(e) => handleFormChange('work_history', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Reference 1</label>
                  <input
                    type="text"
                    value={formData.reference_1}
                    onChange={(e) => handleFormChange('reference_1', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Reference 2</label>
                  <input
                    type="text"
                    value={formData.reference_2}
                    onChange={(e) => handleFormChange('reference_2', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Reference 3</label>
                  <input
                    type="text"
                    value={formData.reference_3}
                    onChange={(e) => handleFormChange('reference_3', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-brand-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-70"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Submit application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
