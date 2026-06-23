import { useQuery } from '@tanstack/react-query'
import { fetchUtilisationHistory } from '../mock/api'

export function useUtilisationHistory() {
  return useQuery({
    queryKey: ['utilisation-history'],
    queryFn: fetchUtilisationHistory,
    staleTime: Infinity, // historical data is generated once — no need to refetch
    refetchInterval: false,
  })
}
