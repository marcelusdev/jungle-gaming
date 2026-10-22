import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import { NFTCard } from '../components/nft-card'
import { useNfts } from '../hooks/useNfts'
import { useCart } from '../hooks/useCart'
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  X,
} from 'lucide-react'


const categories = [
  'Todos',
  'Arte',
  'Gaming',
  'Colecionáveis',
]

export function HomePage() {

    const {
      data: nfts = [],
      isLoading,
      isError,
    } = useNfts()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [favorites, setFavorites] = useState<number[]>([])
  const { cart, addToCart, removeFromCart, clearCart } = useCart()
  const [maxPrice, setMaxPrice] = useState('')

  const filteredNfts = useMemo(() => {
    return nfts.filter((nft) => {
      const matchesSearch =
        nft.name.toLowerCase().includes(search.toLowerCase()) ||
        nft.collection.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        category === 'Todos' || nft.category === category

      const matchesPrice =
        maxPrice === '' || Number(nft.price) <= Number(maxPrice)

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [nfts, search, category, maxPrice])
  
  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

    if (isLoading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#100e0c] text-[#f6f1e9]">
      <p className="text-sm text-white/60">
        Carregando NFTs da Jungle...
      </p>
    </main>
  )
}

if (isError) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#100e0c] px-6 text-center text-[#f6f1e9]">
      <h1 className="text-2xl font-bold">
        Não foi possível carregar os NFTs
      </h1>
      <p className="text-sm text-white/60">
        Verifique sua conexão e tente novamente.
      </p>
    </main>
  )
}


  return (
    <div className="min-h-screen bg-[#100e0c] text-[#f6f1e9]">
      <Header
        search={search}
        onSearchChange={setSearch}
        cartCount={cart.length}
      />
      <main>
        {/* HERO */}
        <section className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10 md:pt-12">
          <div className="relative isolate overflow-hidden rounded-3xl border border-[#ff792d]/20 bg-[#211811]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,121,45,0.22),transparent_45%),radial-gradient(ellipse_at_10%_100%,rgba(101,63,34,0.35),transparent_45%)]" />

            <div className="grid min-h-[370px] items-center md:grid-cols-[1.1fr_0.9fr] md:min-h-[430px]">
              <div className="px-7 py-10 sm:px-12 md:py-14 lg:px-16">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff792d]/30 bg-[#ff792d]/10 px-3 py-2 text-[10px] font-bold tracking-[0.2em] text-[#ff9a60]">
                  <Sparkles size={14} />
                  O FUTURO É COLECIONÁVEL
                </div>

                <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Descubra o extraordinário<span className="text-[#ff792d]">.</span>
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/55 sm:text-base">
                  Explore NFTs únicos, encontre novos universos e descubra
                  colecionáveis digitais feitos para quem vive além do comum.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#explore"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#ff792d] px-6 py-4 text-sm font-bold text-[#1b1009] transition hover:-translate-y-0.5 hover:bg-[#ff9456]"
                  >
                    Explorar marketplace
                    <ArrowUpRight size={17} />
                  </a>
                  <a
                    href="#collections"
                    className="rounded-xl border border-white/15 px-6 py-4 text-sm font-semibold transition hover:border-white/40"
                  >
                    Ver coleções
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-2xl font-black">2.4K<span className="text-[#ff792d]">+</span></p>
                    <p className="mt-1 text-xs text-white/40">NFTs disponíveis</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black">860<span className="text-[#ff792d]">+</span></p>
                    <p className="mt-1 text-xs text-white/40">Colecionadores</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black">120<span className="text-[#ff792d]">+</span></p>
                    <p className="mt-1 text-xs text-white/40">Coleções</p>
                  </div>
                </div>
              </div>

              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden px-5 pb-10 md:min-h-[430px] md:pb-0">
                <div className="absolute h-64 w-64 rounded-full border border-[#ff792d]/15 md:h-80 md:w-80" />
                <div className="absolute h-52 w-52 rounded-full border border-[#ff792d]/20 md:h-64 md:w-64" />
                <div className="absolute h-40 w-40 rounded-full bg-[#ff792d]/10 blur-3xl md:h-56 md:w-56" />

                <div className="relative flex h-56 w-56 rotate-[-5deg] items-center justify-center rounded-[36px] border border-[#ffb17e]/30 bg-gradient-to-br from-[#79502d] via-[#d87536] to-[#281b15] shadow-2xl shadow-black/50 md:h-72 md:w-72">
                  <div className="absolute inset-3 rounded-[28px] border border-white/20" />
                  <div className="absolute left-5 top-5 rounded-full bg-black/25 px-3 py-1 text-[9px] font-bold tracking-widest">
                    #001
                  </div>
                  <span className="select-none text-[115px] drop-shadow-2xl md:text-[150px]">🦍</span>
                  <div className="absolute -bottom-4 -right-5 rotate-[5deg] rounded-2xl border border-white/10 bg-[#171310]/95 p-4 shadow-xl backdrop-blur">
                    <p className="text-[9px] tracking-widest text-white/40">FEATURED NFT</p>
                    <p className="mt-1 text-sm font-bold">Emerald Ape</p>
                    <p className="mt-1 text-xs text-[#ff9456]">Ξ 0.85 ETH</p>
                  </div>
                </div>

                <span className="absolute right-[12%] top-[18%] text-3xl text-[#ff792d]">✳</span>
                <span className="absolute bottom-[17%] left-[10%] text-xl text-[#ffb17e]">✦</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE STRIP */}
        <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-3 md:px-10 md:py-8">
          {[
            { icon: '✦', title: 'Colecionáveis únicos', text: 'Descubra peças digitais especiais.' },
            { icon: '◈', title: 'Explore novos mundos', text: 'Arte, games e universos criativos.' },
            { icon: '↗', title: 'Sua próxima descoberta', text: 'Encontre sua próxima peça favorita.' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff792d]/10 text-xl text-[#ff792d]">
                {item.icon}
              </div>
              <div>
                <h2 className="text-sm font-bold">{item.title}</h2>
                <p className="mt-1 text-xs text-white/40">{item.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* COLLECTIONS */}
        <section id="collections" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-8 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-[#ff792d]">
                ESCOLHA SEU UNIVERSO
              </p>
              <h2 className="text-2xl font-black sm:text-3xl">Explore por categoria</h2>
            </div>
            <a href="#explore" className="flex items-center gap-2 text-sm text-white/50 transition hover:text-[#ff792d]">
              Ver marketplace <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: 'Arte digital', category: 'Arte', emoji: '🎨', style: 'from-purple-950 to-fuchsia-800' },
              { name: 'Gaming', category: 'Gaming', emoji: '🎮', style: 'from-blue-950 to-cyan-800' },
              { name: 'Colecionáveis', category: 'Colecionáveis', emoji: '🦍', style: 'from-amber-950 to-orange-800' },
              { name: 'Todas as peças', category: 'Todos', emoji: '✳', style: 'from-stone-800 to-stone-600' },
            ].map((item) => (
              <button
                type="button"
                key={item.name}
                onClick={() => {
                  setCategory(item.category)
                  document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`group relative flex min-h-32 items-end overflow-hidden rounded-2xl border p-4 text-left transition hover:-translate-y-1 hover:border-[#ff792d]/50 sm:min-h-40 ${
                  category === item.category ? 'border-[#ff792d]/60' : 'border-white/10'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.style} opacity-70 transition group-hover:opacity-100`} />
                <div className="absolute -right-2 -top-6 text-7xl opacity-30 transition group-hover:scale-110 sm:text-8xl">
                  {item.emoji}
                </div>
                <div className="relative">
                  <p className="text-sm font-bold sm:text-base">{item.name}</p>
                  <p className="mt-1 text-[10px] text-white/55">Explorar coleção ↗</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* MARKETPLACE */}
        <section id="explore" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-[#ff792d]">
                SUA PRÓXIMA PEÇA ESTÁ AQUI
              </p>
              <h2 className="text-2xl font-black sm:text-3xl">Explore NFTs</h2>
              <p className="mt-2 text-sm text-white/40">
                Descubra peças selecionadas da comunidade.
              </p>
            </div>
            <div className="text-sm text-white/45">
              <span className="font-bold text-white">{filteredNfts.length}</span> resultados
            </div>
          </div>

          {/* Mobile search */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 md:hidden">
            <Search size={17} className="text-white/40" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar NFTs..."
              aria-label="Buscar NFTs"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
            />
          </div>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row">
            {/* FILTER SIDEBAR */}
            <aside className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Filtros</h3>
                  <SlidersHorizontal size={17} className="text-[#ff792d]" />
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold text-white/80">Categorias</p>
                  <div className="mt-3 space-y-1">
                    {categories.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setCategory(item)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          category === item
                            ? 'bg-[#ff792d]/10 text-[#ff9456]'
                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {item}
                        {category === item && <span>•</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold text-white/80">Preço máximo (ETH)</p>
                  <div className="mt-3 flex items-center rounded-lg border border-white/10 bg-black/20 px-3">
                    <span className="text-xs text-white/40">Ξ</span>
                    <input
                      type="number"
                      min="0"
                      step="0.05"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(event.target.value)}
                      placeholder="Sem limite"
                      aria-label="Preço máximo em ETH"
                      className="w-full bg-transparent px-2 py-3 text-sm outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCategory('Todos')
                    setMaxPrice('')
                    setSearch('')
                  }}
                  className="mt-6 w-full rounded-lg border border-white/10 py-3 text-xs font-semibold text-white/50 transition hover:border-[#ff792d]/40 hover:text-white"
                >
                  Limpar filtros
                </button>
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {/* CATEGORY TABS */}
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                      category === item
                        ? 'border-[#ff792d] bg-[#ff792d] text-[#1b1009]'
                        : 'border-white/10 bg-white/[0.025] text-white/55 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setMaxPrice(maxPrice === '0.70' ? '' : '0.70')}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                    maxPrice === '0.70'
                      ? 'border-[#ff792d] text-[#ff9456]'
                      : 'border-white/10 text-white/55 hover:border-white/30'
                  }`}
                >
                  Até 0.70 ETH <ChevronDown size={14} />
                </button>
              </div>

              {/* NFT GRID */}
              <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
                  {filteredNfts.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      isFavorite={favorites.includes(nft.id)}
                      isInCart={cart.includes(nft.id)}
                      onToggleFavorite={toggleFavorite}
                      onAddToCart={addToCart}
                      onRemoveFromCart={removeFromCart}
                    />
                  ))}
              </div>

              {filteredNfts.length === 0 && (
                <div className="mt-6 rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
                  <Search size={30} className="mx-auto text-white/25" />
                  <h3 className="mt-4 font-bold">Nenhum NFT encontrado</h3>
                  <p className="mt-2 text-sm text-white/45">
                    Tente outra busca ou remova alguns filtros.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      setCategory('Todos')
                      setMaxPrice('')
                    }}
                    className="mt-5 rounded-lg bg-[#ff792d] px-5 py-3 text-xs font-bold text-black"
                  >
                    Limpar busca
                  </button>
                </div>
              )}

              {filteredNfts.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('Todos')
                      setMaxPrice('')
                      setSearch('')
                    }}
                    className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/65 transition hover:border-[#ff792d]/50 hover:text-white"
                  >
                    Ver todos os NFTs
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* COMMUNITY CTA */}
        <section id="community" className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
          <div className="relative overflow-hidden rounded-3xl border border-[#ff792d]/20 bg-[#24180f] p-7 sm:p-10 lg:p-14">
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-[#ff792d]/10 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <p className="text-[10px] font-bold tracking-[0.25em] text-[#ff9456]">FAÇA PARTE DA JUNGLE</p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                  O próximo grande achado pode ser seu.
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/50">
                  Explore novas coleções, acompanhe artistas e descubra
                  o que está surgindo no universo dos colecionáveis digitais.
                </p>
              </div>
              <a
                href="#explore"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#ff792d] px-6 py-4 text-sm font-bold text-[#1b1009] transition hover:bg-[#ff9456]"
              >
                Explorar agora <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0c0b09]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff792d] text-xl">
              🌴
            </div>
            <div>
              <span className="block font-black tracking-tight">
                KURIO<span className="text-[#ff792d]">.</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] text-white/35">
                DIGITAL COLLECTIBLES
              </span>
            </div>
          </a>

          <p className="text-xs leading-6 text-white/35">
            Um universo de colecionáveis digitais para descobrir.
            <br />
            © 2026 Kurio. Projeto demonstrativo.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-white/45">
            <a href="#explore" className="transition hover:text-[#ff792d]">Explorar</a>
            <a href="#collections" className="transition hover:text-[#ff792d]">Coleções</a>
            <a href="#community" className="transition hover:text-[#ff792d]">Comunidade</a>
          </div>
        </div>
      </footer>

      {/* CART FEEDBACK */}
      {cart.length > 0 && (
        <div className="fixed bottom-5 right-5 z-40 flex max-w-[calc(100%-40px)] items-center gap-3 rounded-2xl border border-[#ff792d]/30 bg-[#211811] px-4 py-3 shadow-2xl shadow-black/50">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff792d]/15 text-[#ff9456]">
            <ShoppingBag size={17} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold">
              {cart.length} {cart.length === 1 ? 'NFT adicionado' : 'NFTs adicionados'}
            </p>
            <p className="text-[10px] text-white/45">Carrinho de demonstração</p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="ml-1 rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
            aria-label="Limpar carrinho"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
