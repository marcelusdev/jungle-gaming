
import type { NFT } from './components/nft-card'

export type OrderStatus = 'pending' | 'confirmed' | 'rejected'

export type Order = {
  id: string
  userId: string
  items: {
    id: number
    name: string
    collection: string
    price: number
  }[]
  total: number
  wallet: string
  status: OrderStatus
  transactionRef: string
  createdAt: string
  idempotencyKey?: string
  requestFingerprint?: string
}

const ORDERS_STORAGE_KEY = 'jungle-gaming-orders'

function readOrders(): Order[] {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY)

    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item): item is Order =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        typeof item.id === 'string' &&
        'userId' in item &&
        typeof item.userId === 'string' &&
        'items' in item &&
        Array.isArray(item.items) &&
        'total' in item &&
        typeof item.total === 'number' &&
        'wallet' in item &&
        typeof item.wallet === 'string' &&
        'status' in item &&
        ['pending', 'confirmed', 'rejected'].includes(
          String(item.status),
        ) &&
        'createdAt' in item &&
        typeof item.createdAt === 'string',
    )
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

function makeFingerprint(
  nfts: NFT[],
  wallet: string,
  userId: string,
): string {
  return JSON.stringify({
    userId,
    wallet,
    items: nfts.map((nft) => ({
      id: nft.id,
      price: String(nft.price),
    })),
  })
}

export function createOrder(
  nfts: NFT[],
  wallet: string,
  userId: string,
  idempotencyKey: string = crypto.randomUUID(),
): Order {
  if (nfts.length === 0) {
    throw new Error('EMPTY_ORDER')
  }

  if (new Set(nfts.map((nft) => nft.id)).size !== nfts.length) {
    throw new Error('DUPLICATE_ITEMS')
  }

  const fingerprint = makeFingerprint(nfts, wallet, userId)
  const orders = readOrders()

  const previousOrder = orders.find(
    (order) => order.idempotencyKey === idempotencyKey,
  )

  if (previousOrder) {
    if (previousOrder.requestFingerprint !== fingerprint) {
      throw new Error('IDEMPOTENCY_CONFLICT')
    }

    return previousOrder
  }

  const items = nfts.map((nft) => ({
    id: nft.id,
    name: nft.name,
    collection: nft.collection,
    price: Number(nft.price),
  }))

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const order: Order = {
    id: crypto.randomUUID(),
    userId,
    items,
    total: Number(total.toFixed(2)),
    wallet,
    status: 'pending',
    transactionRef: '',
    createdAt: new Date().toISOString(),
    idempotencyKey,
    requestFingerprint: fingerprint,
  }

  saveOrders([...orders, order])

  return order
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Order | null {
  const orders = readOrders()
  const index = orders.findIndex((order) => order.id === id)

  if (index === -1) return null

  const current = orders[index]

  // Estados finais não podem ser alterados.
  if (current.status === 'confirmed' || current.status === 'rejected') {
    return current.status === status ? current : null
  }

  const updated: Order = {
    ...current,
    status,
    transactionRef:
      status === 'confirmed'
        ? `SIM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
        : '',
  }

  orders[index] = updated
  saveOrders(orders)

  return updated
}

export function getOrderById(id: string): Order | null {
  return readOrders().find((order) => order.id === id) ?? null
}

export function getOrders(): Order[] {
  return readOrders()
}
