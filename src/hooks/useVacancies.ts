'use client'

import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchVacancies, fetchVacancyByIdentifier, Vacancy, VacancyListResponse } from '@/lib/vacancies'

export function useVacancies(page: number, pageSize: number) {
  return useQuery<VacancyListResponse>({
    queryKey: ['vacancies', page, pageSize],
    queryFn: () => fetchVacancies(page, pageSize),
    placeholderData: keepPreviousData,
  })
}

export function useVacancy(identifier?: string) {
  return useQuery<Vacancy>({
    queryKey: ['vacancy', identifier],
    queryFn: () => fetchVacancyByIdentifier(identifier || ''),
    enabled: Boolean(identifier),
  })
}
