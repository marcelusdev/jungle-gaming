
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { router } from './router'
import { CartProvider } from './CartContext'
import { worker } from './mocks/browser'
import { SocketListener } from './components/SocketListener'

import './index.css'

const queryClient = new QueryClient()

async function enableMocking() {
  if (import.meta.env.DEV) {
    await worker.start({
      quiet: true,
    })
  }
}

async function bootstrap() {
  await enableMocking()

  const rootElement = document.getElementById('root')

  if (!rootElement) {
    throw new Error('Elemento root não encontrado no HTML.')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <>
            <SocketListener />
            <RouterProvider router={router} />
          </>
        </CartProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

bootstrap().catch((error: unknown) => {
  console.error('Erro ao iniciar a aplicação:', error)
})
