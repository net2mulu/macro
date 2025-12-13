'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Briefcase, MapPin, Clock, Calendar, ArrowRight, Loader2, Building2, SearchX, RefreshCcw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useVacancies } from '@/hooks/useVacancies'

const PAGE_SIZE = 9

const formatDate = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return 'Competitive'
  if (min && !max) return `ETB ${min.toLocaleString()}+`
  if (!min && max) return `Up to ETB ${max.toLocaleString()}`
  return `ETB ${min?.toLocaleString()} - ${max?.toLocaleString()}`
}

export default function VacanciesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useVacancies(page, PAGE_SIZE)

  const vacancies = data?.data || []
  const pagination = data?.meta?.pagination
  const totalPages = pagination?.pageCount || 1

  const highlightStats = useMemo(
    () => [
      { label: 'Open Roles', value: pagination?.total ?? vacancies.length ?? 0 },
      { label: 'Locations', value: new Set(vacancies.map((v) => v.location || '—')).size },
      { label: 'Employment Types', value: new Set(vacancies.map((v) => v.employmentType || '—')).size },
    ],
    [pagination?.total, vacancies]
  )

  const heroBackground = '/background/3.png'

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="relative text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image src={heroBackground} alt="Vacancies" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 px-4">Join Macro Construction</h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto px-4">
              We are loading the latest opportunities for you.
            </p>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20 text-gray-600 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
              <span className="text-lg">Fetching vacancies...</span>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="relative text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image src={heroBackground} alt="Vacancies" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 backdrop-blur-sm mb-6">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Join Macro Construction</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              We encountered a temporary issue loading our open roles.
            </p>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-red-100 rounded-2xl bg-red-50/30">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                <RefreshCcw className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to load vacancies</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Please check your internet connection or try refreshing the page. If the problem persists, feel free to contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                >
                  <RefreshCcw className="h-4 w-4" /> Try again
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Contact HR
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroBackground} alt="Vacancies" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
          <p className="text-brand-300 font-semibold tracking-wide uppercase mb-4 text-sm md:text-base">Vacancies</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 px-2">Grow Your Career With Us</h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto px-4 leading-relaxed">
            Explore current openings across our construction, engineering, and corporate teams.
          </p>
        </div>
      </section>

      {/* Intro + Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Build the future with Macro</h2>
              <p className="text-lg text-gray-600">
                We deliver landmark projects across Ethiopia. Join a team that values safety, collaboration,
                and growth, with opportunities ranging from site roles to corporate support.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-white shadow text-gray-800 inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-brand-600" /> Grade I Contractor
                </span>
                <span className="px-4 py-2 rounded-full bg-white shadow text-gray-800 inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-600" /> Career Growth
                </span>
                <span className="px-4 py-2 rounded-full bg-white shadow text-gray-800 inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-600" /> Nationwide Projects
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlightStats.map((stat) => (
                <div key={stat.label} className="bg-white shadow rounded-xl p-5 text-center transition-transform hover:-translate-y-1 duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-brand-600">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vacancies Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase text-gray-500 tracking-wide">Open positions</p>
              <h3 className="text-2xl font-bold text-gray-900">Current vacancies</h3>
            </div>
            {isFetching && <Loader2 className="h-5 w-5 animate-spin text-brand-600" />}
          </div>

          {vacancies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No vacancies found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                We don't have any matching positions right now, but we are always looking for great talent.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors"
              >
                Send us your CV anyway <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vacancies.map((vacancy) => (
                <div
                  key={vacancy.id}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-brand-600">{vacancy.employmentType || 'Full-time'}</p>
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                          {vacancy.title}
                        </h4>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          vacancy.status === 'open'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {vacancy.status ? vacancy.status.toUpperCase() : 'OPEN'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-3">{vacancy.description}</p>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand-600" />
                        <span>{vacancy.location || 'Location flexible'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-600" />
                        <span>{vacancy.employmentType || 'Full-time'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-brand-600" />
                        <span>Posted {formatDate(vacancy.postedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-brand-600" />
                        <span>{formatSalary(vacancy.salaryMin, vacancy.salaryMax)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        Deadline: <span className="font-semibold text-gray-700">{formatDate(vacancy.deadline)}</span>
                      </div>
                      <Link
                        href={`/vacancies/${encodeURIComponent(vacancy.documentId || vacancy.id.toString())}`}
                        className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700"
                      >
                        View details <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50 hover:border-brand-600 hover:text-brand-600 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 disabled:opacity-50 hover:border-brand-600 hover:text-brand-600 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-3xl font-bold">Stay ready for the next opportunity</h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Even if you do not see the perfect role today, submit your application on any open position and we will
            keep you in mind for future openings.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Talk to HR
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
