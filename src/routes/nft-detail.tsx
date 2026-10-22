
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react'
import { nfts } from '../data/nfts'
import { useCart } from '../hooks/useCart'

export function NFTDetailPage() {
  const { nftId } = useParams({ from: '/nft/$nftId' })
  const { cart, addToCart, removeFromCart } = useCart()

  const nft = nfts.find((item) => item.id === Number(nftId))

  if (!nft) {
    return (
      <main className="min-h-screen bg-[#0b0e0f] px-6 py-12 text-white">
        <h1 className="text-2xl font-bold">NFT não encontrado</h1>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-[#ff9456] hover:text-white"
        >
          <ArrowLeft size={18} />
          Voltar para a página inicial
        </Link>
      </main>
    )
  }

  const isInCart = cart.includes(nft.id)

  return (
    <main className="min-h-screen bg-[#0b0e0f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#ff9456]"
        >
          <ArrowLeft size={18} />
          Voltar ao marketplace
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <div
            className={`flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${nft.background}`}
          >
            <span
              aria-hidden="true"
              className="select-none text-9xl drop-shadow-2xl sm:text-[12rem]"
            >
              {nft.art}
            </span>
          </div>

          <section className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                {nft.collection}
              </span>

              <span className="rounded-full bg-[#ff792d]/15 px-3 py-1 text-xs font-semibold text-[#ff9456]">
                {nft.category}
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              {nft.name}
            </h1>

            <p className="mt-4 leading-7 text-white/60">
              Explore este colecionável digital do universo Jungle Gaming.
              Confira suas informações e prepare-se para adicioná-lo ao seu
              carrinho.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm text-white/50">Preço atual</p>

              <p className="mt-2 text-3xl font-bold">
                Ξ {nft.price} ETH
              </p>

              <p className="mt-2 text-xs text-white/40">
                Item #{nft.id}
              </p>
            </div>

            {nft.tag && (
              <div className="mt-5 flex items-center gap-2 text-sm text-[#ff9456]">
                <Sparkles size={17} />
                {nft.tag}
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                isInCart
                  ? removeFromCart(nft.id)
                  : addToCart(nft.id)
              }
              aria-pressed={isInCart}
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold transition-colors ${
                isInCart
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-[#ff792d] text-[#1b1009] hover:bg-[#ff9456]'
              }`}
            >
              <ShoppingBag size={19} />
              {isInCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
            </button>
          </section>
        </div>
      </div>
    </main>
  )
}
