
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ShoppingBag, Trash2, Sparkles } from 'lucide-react'
import { useNfts } from '../hooks/useNfts'
import { useCart } from '../hooks/useCart'

export function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const {
    data: nfts = [],
    isLoading,
    isError,
  } = useNfts()

  const cartNfts = nfts.filter((nft) => cart.includes(nft.id))

  const total = cartNfts.reduce(
    (sum, nft) => sum + Number(nft.price),
    0,
  )

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0e0f] text-white">
        <p className="text-sm text-white/60">
          Carregando seu carrinho...
        </p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0e0f] px-6 text-center text-white">
        <h1 className="text-2xl font-bold">
          Não foi possível carregar seu carrinho
        </h1>

        <p className="text-sm text-white/60">
          Verifique sua conexão e tente novamente.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#ff9456] hover:text-white"
        >
          <ArrowLeft size={18} />
          Voltar ao marketplace
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0b0e0f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#ff9456]"
        >
          <ArrowLeft size={18} />
          Continuar comprando
        </Link>

        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <ShoppingBag size={28} className="text-[#ff9456]" />
            <h1 className="text-3xl font-black sm:text-4xl">
              Meu carrinho
            </h1>
          </div>

          <p className="text-sm text-white/50">
            {cartNfts.length === 1
              ? '1 NFT adicionado ao seu carrinho'
              : `${cartNfts.length} NFTs adicionados ao seu carrinho`}
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

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
              Explore nosso marketplace e encontre NFTs incríveis
              para adicionar à sua coleção.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#ff792d] px-6 py-3 font-bold text-[#1b1009] transition-colors hover:bg-[#ff9456]"
            >
              <Sparkles size={18} />
              Explorar NFTs
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
            <section className="space-y-4">
              {cartNfts.map((nft) => (
                <article
                  key={nft.id}
                  className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#15191b] p-4 sm:flex-row sm:items-center"
                >
                  <div
                    className={`flex aspect-square w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br sm:size-28 ${nft.background}`}
                  >
                    <span className="text-5xl" aria-hidden="true">
                      {nft.art}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/45">
                      {nft.collection}
                    </p>

                    <h2 className="mt-1 text-lg font-bold">
                      {nft.name}
                    </h2>

                    <p className="mt-2 text-xs text-white/45">
                      {nft.category} · Item #{nft.id}
                    </p>

                    <p className="mt-3 font-bold text-[#ff9456]">
                      Ξ {nft.price} ETH
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(nft.id)}
                    aria-label={`Remover ${nft.name} do carrinho`}
                    className="flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 px-4 py-3 text-sm text-white/60 transition-colors hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400 sm:self-center"
                  >
                    <Trash2 size={17} />
                    Remover
                  </button>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-white/45 transition-colors hover:text-rose-400"
              >
                Limpar carrinho
              </button>
            </section>

            <aside className="rounded-2xl border border-white/10 bg-[#15191b] p-6 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold">
                Resumo do pedido
              </h2>

              <div className="mt-6 flex items-center justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span>Ξ {total.toFixed(2)} ETH</span>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                <span>Taxas</span>
                <span>A calcular</span>
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="flex items-center justify-between gap-3">
                <span className="font-bold">Total parcial</span>
                <span className="text-xl font-black text-[#ff9456]">
                  Ξ {total.toFixed(2)} ETH
                </span>
              </div>

              <p className="mt-4 text-xs leading-5 text-white/40">
                O valor final e as eventuais taxas serão confirmados
                durante a etapa de pagamento.
              </p>

              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#ff792d] px-5 py-4 font-bold text-[#1b1009] transition-colors hover:bg-[#ff9456]"
              >
                Continuar para pagamento
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
