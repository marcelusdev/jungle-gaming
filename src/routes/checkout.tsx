
import { Link, useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import {
  ArrowLeft,
  Wallet,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react'
import { useNfts } from '../hooks/useNfts'
import { api } from '../lib/api'
import type { Order } from '../order'
import { useCart } from '../hooks/useCart'
import { getCurrentUser } from '../auth'

export function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const [selectedWallet, setSelectedWallet] = useState('jungle-wallet')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    data: nfts = [],
  } = useNfts()

  const cartNfts = nfts.filter((nft) => cart.includes(nft.id))

  const total = cartNfts.reduce(
    (sum, nft) => sum + Number(nft.price),
    0,
  )

  const user = getCurrentUser()
  const idempotencyKey = useRef(crypto.randomUUID())
  const [simulateDecline, setSimulateDecline] = useState(false)



async function handleConfirmPurchase() {
  if (cartNfts.length === 0 || !selectedWallet || isSubmitting) return

  if (!user) {
    alert('Faça login para finalizar a compra.')
    navigate({ to: '/login' })
    return
  }

  setIsSubmitting(true)

  try {
    const response = await api.post<Order>(
      '/orders',
      {
        nftIds: cartNfts.map((nft) => nft.id),
        wallet: selectedWallet,
        userId: user.id,
        simulateDecline,
      },
      {
        headers: {
          'Idempotency-Key': idempotencyKey.current,
        },
      },
    )

    const order = response.data

    if (order.status === 'confirmed') {
      clearCart()
    } else if (order.status === 'rejected') {
      // Uma nova tentativa deve gerar um novo pedido.
      idempotencyKey.current = crypto.randomUUID()
    }

    navigate({
      to: '/order-confirmation',
      search: { orderId: order.id },
    })
  } catch {
    alert('Não foi possível processar o pedido. Tente novamente.')
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <main className="min-h-screen bg-[#0b0e0f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#ff9456]"
        >
          <ArrowLeft size={18} />
          Voltar ao carrinho
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-black sm:text-4xl">
            Finalizar compra
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Revise seus NFTs e selecione sua carteira para continuar.
          </p>
        </div>

        {cartNfts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <ShoppingBag
              size={48}
              className="mx-auto mb-5 text-white/20"
            />

            <h2 className="text-xl font-bold">
              Seu carrinho está vazio
            </h2>

            <p className="mt-3 text-sm text-white/50">
              Adicione um NFT antes de iniciar o checkout.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#ff792d] px-6 py-3 font-bold text-[#1b1009] hover:bg-[#ff9456]"
            >
              Explorar NFTs
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
            <section className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#15191b] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <ShoppingBag className="text-[#ff9456]" size={22} />
                  <h2 className="text-xl font-bold">
                    Resumo dos itens
                  </h2>
                </div>

                <div className="space-y-4">
                  {cartNfts.map((nft) => (
                    <div
                      key={nft.id}
                      className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <div
                        className={`flex size-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${nft.background}`}
                      >
                        <span className="text-3xl" aria-hidden="true">
                          {nft.art}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-bold">
                          {nft.name}
                        </h3>
                        <p className="mt-1 text-xs text-white/45">
                          {nft.collection}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold">
                        Ξ {nft.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#15191b] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Wallet className="text-[#ff9456]" size={22} />
                  <div>
                    <h2 className="text-xl font-bold">
                      Método de pagamento
                    </h2>
                    <p className="mt-1 text-sm text-white/45">
                      Escolha uma carteira simulada.
                    </p>
                  </div>
                </div>

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                    selectedWallet === 'jungle-wallet'
                      ? 'border-[#ff792d] bg-[#ff792d]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="wallet"
                    value="jungle-wallet"
                    checked={selectedWallet === 'jungle-wallet'}
                    onChange={(event) =>
                      setSelectedWallet(event.target.value)
                    }
                    className="accent-[#ff792d]"
                  />

                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#ff792d]/15">
                    <Wallet className="text-[#ff9456]" size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="font-bold">Jungle Wallet</p>
                    <p className="mt-1 text-xs text-white/45">
                      Carteira de demonstração
                    </p>
                  </div>

                  {selectedWallet === 'jungle-wallet' && (
                    <CheckCircle2
                      size={20}
                      className="text-[#ff9456]"
                    />
                  )}
                </label>

                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-white/40">
                <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-4">
 "                   <input
                      type="checkbox"
                      checked={simulateDecline}
                      onChange={(event) => setSimulateDecline(event.target.checked)}
                      className="accent-[#ff792d]"
                    />
                    <span className="text-sm text-white/70">
                      Simular pagamento recusado
                    </span>
                  </label>"
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                  />
                  Esta etapa utiliza uma carteira fictícia. Nenhuma
                  transação real será realizada.
                </p>
              </div>
            </section>

            <aside className="rounded-2xl border border-white/10 bg-[#15191b] p-6 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold">
                Resumo do pedido
              </h2>

              <div className="mt-6 flex justify-between gap-4 text-sm text-white/60">
                <span>Itens ({cartNfts.length})</span>
                <span>Ξ {total.toFixed(2)} ETH</span>
              </div>

              <div className="mt-4 flex justify-between gap-4 text-sm text-white/60">
                <span>Taxas</span>
                <span>A calcular</span>
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="flex items-center justify-between gap-3">
                <span className="font-bold">Subtotal</span>
                <span className="text-xl font-black text-[#ff9456]">
                  Ξ {total.toFixed(2)} ETH
                </span>
              </div>

              <button
                type="button"
                disabled={isSubmitting || cartNfts.length === 0 || !selectedWallet}
                onClick={handleConfirmPurchase} 
                className="mt-7 w-full rounded-xl bg-[#ff792d] px-5 py-4 font-bold text-[#1b1009] transition-colors hover:bg-[#ff9456] disabled:cursor-not-allowed disabled:opacity-50"
              >
              {isSubmitting ? 'Processando compra...' : 'Confirmar compra'}              </button>

              <p className="mt-4 text-center text-xs leading-5 text-white/40">
                A compra ainda não será processada nesta etapa.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
