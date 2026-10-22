
import { http, HttpResponse } from 'msw'
import { nfts } from '../data/nfts'
import { createOrder, updateOrderStatus } from '../order'
import type { NFT } from '../components/nft-card'
import type { User } from '../auth'

const USERS_STORAGE_KEY = 'jungle-gaming-users'

type StoredUser = User & {
  password: string
}

function getUsers(): StoredUser[] {
  try {
    const saved = localStorage.getItem(USERS_STORAGE_KEY)

    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (user): user is StoredUser =>
        typeof user === 'object' &&
        user !== null &&
        'id' in user &&
        'name' in user &&
        'email' in user &&
        'password' in user &&
        typeof user.id === 'string' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.password === 'string',
    )
  } catch {
    return []
  }
}

export const handlers = [
  http.get('/api/nfts', () => {
    return HttpResponse.json(nfts)
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    const body = (await request.json()) as {
      name?: string
      email?: string
      password?: string
    }

    const name = body.name?.trim()
    const email = body.email?.trim().toLowerCase()
    const password = body.password

    if (
      !name ||
      !email ||
      !email.includes('@') ||
      typeof password !== 'string' ||
      password.length < 6
    ) {
      return HttpResponse.json(
        {
          message:
            'Confira os dados. A senha deve ter pelo menos 6 caracteres.',
        },
        { status: 400 },
      )
    }

    const users = getUsers()

    if (users.some((user) => user.email === email)) {
      return HttpResponse.json(
        { message: 'Este e-mail já está cadastrado.' },
        { status: 409 },
      )
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    }

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify([...users, user]),
    )

    const publicUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    return HttpResponse.json(publicUser, { status: 201 })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as {
      email?: string
      password?: string
    }

    const email = body.email?.trim().toLowerCase()
    const password = body.password

    if (
      !email ||
      typeof password !== 'string' ||
      !password
    ) {
      return HttpResponse.json(
        { message: 'Informe seu e-mail e sua senha.' },
        { status: 400 },
      )
    }

    const user = getUsers().find(
      (item) =>
        item.email === email &&
        item.password === password,
    )

    if (!user) {
      return HttpResponse.json(
        { message: 'E-mail ou senha incorretos.' },
        { status: 401 },
      )
    }

    const publicUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    }
    
    return HttpResponse.json(publicUser)
  }),


http.post('/api/orders', async ({ request }) => {
  try {
    const body = (await request.json()) as {
      nftIds?: number[]
      wallet?: string
      userId?: string
      simulateDecline?: boolean
    }

    if (
      !Array.isArray(body.nftIds) ||
      body.nftIds.length === 0 ||
      !body.nftIds.every(
        (id) => Number.isInteger(id) && id > 0,
      ) ||
      typeof body.wallet !== 'string' ||
      !body.wallet.trim() ||
      typeof body.userId !== 'string' ||
      !body.userId.trim()
    ) {
      return HttpResponse.json(
        { message: 'Dados do pedido inválidos.' },
        { status: 400 },
      )
    }

    if (new Set(body.nftIds).size !== body.nftIds.length) {
      return HttpResponse.json(
        { message: 'O pedido contém NFTs duplicados.' },
        { status: 400 },
      )
    }

    const users = getUsers()
    const userExists = users.some(
      (user) => user.id === body.userId!.trim(),
    )

    if (!userExists) {
      return HttpResponse.json(
        { message: 'Usuário não encontrado.' },
        { status: 401 },
      )
    }

    const selectedNfts = body.nftIds.map((id) =>
      nfts.find((nft) => nft.id === id),
    )

    if (selectedNfts.some((nft) => !nft)) {
      return HttpResponse.json(
        { message: 'Um ou mais NFTs não foram encontrados.' },
        { status: 400 },
      )
    }

    const validNfts = selectedNfts.filter(
      (nft): nft is NFT => nft !== undefined,
    )

    const idempotencyKey =
      request.headers.get('Idempotency-Key')?.trim() ||
      crypto.randomUUID()

    const order = createOrder(
      validNfts,
      body.wallet.trim(),
      body.userId.trim(),
      idempotencyKey,
    )

    // Não altera novamente um pedido que já terminou.
    const finalOrder =
      order.status !== 'pending'
        ? order
        : updateOrderStatus(
            order.id,
            body.simulateDecline === true
              ? 'rejected'
              : 'confirmed',
          )

    if (!finalOrder) {
      return HttpResponse.json(
        { message: 'Não foi possível atualizar o pedido.' },
        { status: 409 },
      )
    }

    return HttpResponse.json(finalOrder, { status: 201 })
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'IDEMPOTENCY_CONFLICT'
    ) {
      return HttpResponse.json(
        { message: 'A chave de requisição já foi utilizada em outro pedido.' },
        { status: 409 },
      )
    }

    return HttpResponse.json(
      { message: 'Não foi possível processar o pedido.' },
      { status: 500 },
    )
  }
}),
]
