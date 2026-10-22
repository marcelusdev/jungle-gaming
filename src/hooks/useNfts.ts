
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { NFT } from '../components/nft-card'

export function useNfts() {
  return useQuery({
    queryKey: ['nfts'],
    queryFn: async () => {
      const response = await api.get<NFT[]>('/nfts')
      return response.data
    },
  })
}
