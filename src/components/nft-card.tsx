import { Heart, ShoppingBag, Check } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export type NFT = {
  id: number
  name: string
  collection: string
  price: string
  category: string
  art: string
  background: string
  tag: string
}

type NFTCardProps = {
  nft: NFT
  isFavorite: boolean
  isInCart: boolean
  onToggleFavorite: (id: number) => void
  onAddToCart: (id: number) => void
  onRemoveFromCart: (id: number) => void
}

export function NFTCard({
  nft,
  isFavorite,
  isInCart,
  onToggleFavorite,
  onAddToCart,
  onRemoveFromCart,
}: NFTCardProps) {

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15191b] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff792d]/50">
      {/* Arte do NFT */}
      <div
        className={`relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br ${nft.background}`}
      >
       
      <Link
        to="/nft/$nftId"
        params={{ nftId: String(nft.id) }}
        aria-label={`Ver detalhes de ${nft.name}`}
        className="flex h-full w-full items-center justify-center"
      >
        <span
          aria-hidden="true"
          className="select-none text-8xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 sm:text-9xl"
        >
          {nft.art}
        </span>
      </Link>


        {/* Tag do NFT */}
        {nft.tag && (
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
            {nft.tag}
          </span>
        )}

        {/* Favoritos */}
        <button
          type="button"
          onClick={() => onToggleFavorite(nft.id)}
          aria-label={
            isFavorite
              ? `Remover ${nft.name} dos favoritos`
              : `Adicionar ${nft.name} aos favoritos`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 backdrop-blur-sm transition-colors ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-black/60 text-white hover:bg-rose-500'
          }`}
        >
          <Heart
            size={19}
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Informações */}
      <div className="p-4">
        <p className="mb-1 text-xs text-white/45">
          {nft.collection}
        </p>

        <div className="mb-4 flex items-center justify-between gap-3">
         
          <h3 className="truncate text-base font-bold text-white">
            <Link
              to="/nft/$nftId"
              params={{ nftId: String(nft.id) }}
              className="transition-colors hover:text-[#ff9456]"
            >
              {nft.name}
            </Link>
          </h3>


          <span className="shrink-0 text-[10px] text-white/45">
            {nft.category}
          </span>
        </div>

        {/* Preço e carrinho */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            <p className="mb-1 text-xs text-white/40">
              Preço
            </p>

            <p className="font-bold text-white">
              Ξ {nft.price} ETH
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
            isInCart
                ? onRemoveFromCart(nft.id)
                : onAddToCart(nft.id)
            } 

           aria-label={
            isInCart
                ? `Remover ${nft.name} do carrinho`
                : `Adicionar ${nft.name} ao carrinho`
            }
            aria-pressed={isInCart}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${
              isInCart
                ? 'bg-[#ff792d]/15 text-[#ff9456]'
                : 'bg-[#ff792d] text-[#1b1009] hover:bg-[#ff9456]'
            }`}
          >
            {isInCart ? (
              <>
                <Check size={16} />
                Adicionado
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Comprar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}