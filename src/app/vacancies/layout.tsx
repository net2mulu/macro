import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vacancies | MACRO General Contractor',
  description: 'Explore career opportunities and job openings at MACRO General Contractor. Join our team.',
}

export default function VacanciesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
