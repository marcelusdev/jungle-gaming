import { createContext } from 'react'

export type CartContextType = {
  cart: number[]
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
)