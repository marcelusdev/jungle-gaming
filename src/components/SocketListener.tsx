
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { socket } from '../lib/socket'

type RealtimeEvent = {
  message: string
  updatedAt: string
}

export function SocketListener() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleConnect = () => {
      console.log('Socket.IO conectado:', socket.id)
    }

    const handleDisconnect = () => {
      console.log('Socket.IO desconectado')
    }

    const handleNftUpdated = (event: RealtimeEvent) => {
      console.log('Evento nft.updated:', event)

      void queryClient.invalidateQueries({
        queryKey: ['nfts'],
      })
    }

    const handleOrderUpdated = (event: RealtimeEvent) => {
      console.log('Evento order.updated:', event)

      void queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('nft.updated', handleNftUpdated)
    socket.on('order.updated', handleOrderUpdated)

    socket.connect()

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('nft.updated', handleNftUpdated)
      socket.off('order.updated', handleOrderUpdated)

      socket.disconnect()
    }
  }, [queryClient])

  return null
}
