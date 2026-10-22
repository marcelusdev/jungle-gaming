
import { useQuery } from '@tanstack/react-query'
import { nfts } from '../data/nfts'

export function useNfts() {
  return useQuery({
    queryKey: ['nfts'],
    queryFn: async () => nfts,
  })
}
