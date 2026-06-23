import { useQuery } from '@tanstack/react-query'
import { fetchMachines } from '../mock/api'

export function useMachines() {
  return useQuery({
    queryKey: ['machines'],
    queryFn: fetchMachines,
  })
}
