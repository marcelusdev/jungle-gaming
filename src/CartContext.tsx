import {
  useState,
  useEffect,
  type ReactNode,
} from 'react'

import { CartContext } from './contexts/CartContext'

const CART_STORAGE_KEY = 'jungle-gaming-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<number[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart)

        if (
          Array.isArray(parsedCart) &&
          parsedCart.every(
            (id) => typeof id === 'number' && Number.isInteger(id),
          )
        ) {
          return [...new Set(parsedCart)]
        }
      }
    } catch {
      // Se os dados salvos forem inválidos, iniciaremos um carrinho vazio.
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  function addToCart(id: number) {
    setCart((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }

  function removeFromCart(id: number) {
    setCart((current) => current.filter((item) => item !== id))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
