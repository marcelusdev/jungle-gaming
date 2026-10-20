
import { useMemo, useState } from 'react'
import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  SlidersHorizontal,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react'

const nfts = [
  {
    id: 1,
    name: 'Emerald Ape',
    collection: 'Jungle Legends',
    price: '0.85',
    category: 'Colecionáveis',
    art: '🦍',
    background: 'from-emerald-950 via-green-800 to-lime-500',
    tag: 'POPULAR',
  },
  {
    id: 2,
    name: 'Cosmic Bloom',
    collection: 'Digital Dreams',
    price: '0.42',
    category: 'Arte',
    art: '🌌',
    background: 'from-violet-950 via-purple-700 to-fuchsia-400',
    tag: '',
  },
  {
    id: 3,
    name: 'Violet Nomad',
    collection: 'Mystic Creatures',
    price: '1.20',
    category: 'Gaming',
    art: '🧙',
    background: 'from-indigo-950 via-violet-800 to-purple-400',
    tag: 'RARO',
  },
  {
    id: 4,
    name: 'Ivory Baron',
    collection: 'Jungle Legends',
    price: '0.67',
    category: 'Colecionáveis',
    art: '🦊',
    background: 'from-stone-800 via-amber-800 to-orange-300',
    tag: '',
  },
  {
    id: 5,
    name: 'Pixel Warrior',
    collection: 'Arcade Genesis',
    price: '0.35',
    category: 'Gaming',
    art: '👾',
    background: 'from-sky-950 via-blue-700 to-cyan-300',
    tag: '',
  },
  {
    id: 6,
    name: 'Golden Beat',
    collection: 'Digital Dreams',
    price: '0.95',
    category: 'Arte',
    art: '🎧',
    background: 'from-yellow-950 via-amber-700 to-yellow-300',
    tag: 'DESTAQUE',
  },
  {
    id: 7,
    name: 'Phantom Fox',
    collection: 'Mystic Creatures',
    price: '0.58',
    category: 'Colecionáveis',
    art: '🦊',
    background: 'from-red-950 via-rose-800 to-orange-400',
    tag: '',
  },
  {
    id: 8,
    name: 'Neon Guardian',
    collection: 'Arcade Genesis',
    price: '1.45',
    category: 'Gaming',
    art: '🤖',
    background: 'from-cyan-950 via-teal-700 to-emerald-300',
    tag: 'RARO',
  },
]

const categories = [
  'Todos',
  'Arte',
  'Gaming',
  'Colecionáveis',
]

export function HomePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
  }, [search, category, maxPrice])

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function addToCart(id: number) {
    setCart((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }

  return (
    <div className="min-h-screen bg-[#100e0c] text-[#f6f1e9]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#100e0c]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 md:px-10">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff792d] text-2xl">
              🌴
            </div>
            <div>
              <span className="block text-xl font-black tracking-tight">
                KURIO<span className="text-[#ff792d]">.</span>
              </span>
              <span className="hidden text-[9px] tracking-[0.3em] text-white/40 sm:block">
                DIGITAL COLLECTIBLES
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
            <a href="#explore" className="text-white transition hover:text-[#ff792d]">
              Explorar
            </a>
            <a href="#collections" className="transition hover:text-[#ff792d]">
              Coleções
            </a>
            <a href="#community" className="transition hover:text-[#ff792d]">
              Comunidade
            </a>
          </nav>

          <div className="hidden max-w-[310px] flex-1 md:flex">
            <label className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <Search size={17} className="shrink-0 text-white/40" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar NFTs..."
                aria-label="Buscar NFTs"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Limpar busca"
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative rounded-xl border border-white/10 p-3 transition hover:border-[#ff792d]/60"
              aria-label={`Carrinho, ${cart.length} itens`}
            >
              <ShoppingBag size={19} />
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff792d] px-1 text-[10px] font-bold text-black">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              type="button"
              className="hidden items-center gap-2 rounded-xl bg-[#ff792d] px-4 py-3 text-sm font-bold text-[#1a1009] transition hover:bg-[#ff9456] sm:flex"
              onClick={() => alert('A conexão de carteira será implementada na próxima etapa.')}
            >
              <Wallet size={17} />
              Conectar carteira
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-white/10 p-3 lg:hidden"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#171310] p-5 lg:hidden">
            <nav className="flex flex-col gap-4 text-sm text-white/70">
              <a href="#explore" onClick={() => setMobileMenuOpen(false)}>Explorar NFTs</a>
              <a href="#collections" onClick={() => setMobileMenuOpen(false)}>Coleções</a>
              <a href="#community" onClick={() => setMobileMenuOpen(false)}>Comunidade</a>
              <button
                type="button"
                className="flex items-center gap-2 text-left text-[#ff792d]"
                onClick={() => alert('A conexão de carteira será implementada na próxima etapa.')}
              >
                <Wallet size={17} /> Conectar carteira
              </button>
            </nav>
          </div>
        )}
      </header>

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
                {filteredNfts.map((nft) => {
                  const isFavorite = favorites.includes(nft.id)
                  const isInCart = cart.includes(nft.id)

                  return (
                    <article
                      key={nft.id}
                      className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-[#191512] transition duration-300 hover:-translate-y-1 hover:border-[#ff792d]/40 hover:shadow-xl hover:shadow-black/20"
                    >
                      <div className={`relative flex aspect-[1.12/1] items-center justify-center overflow-hidden bg-gradient-to-br ${nft.background}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.2),transparent_48%)]" />
                        <div className="absolute inset-4 rounded-2xl border border-white/15" />
                        <div className="absolute inset-0 bg-black/5 transition group-hover:bg-transparent" />
                        <span className="relative select-none text-8xl drop-shadow-2xl transition duration-500 group-hover:scale-110">
                          {nft.art}
                        </span>

                        {nft.tag && (
                          <span className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/40 px-2 py-1 text-[9px] font-bold tracking-widest backdrop-blur">
                            {nft.tag}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleFavorite(nft.id)}
                          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                          aria-pressed={isFavorite}
                          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
                            isFavorite
                              ? 'border-rose-400/40 bg-rose-500/20 text-rose-300'
                              : 'border-white/20 bg-black/30 text-white hover:bg-black/60'
                          }`}
                        >
                          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                        </button>

                        <span className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] text-white/80 backdrop-blur">
                          {nft.collection}
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate font-bold">{nft.name}</h3>
                            <p className="mt-1 text-xs text-white/40">{nft.category}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-[10px] text-white/35">Preço atual</p>
                            <p className="mt-1 font-bold text-[#ff9456]">Ξ {nft.price}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(nft.id)}
                          disabled={isInCart}
                          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition ${
                            isInCart
                              ? 'cursor-default border border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                              : 'bg-white/[0.06] text-white hover:bg-[#ff792d] hover:text-[#1b1009]'
                          }`}
                        >
                          {isInCart ? '✓ Adicionado ao carrinho' : (
                            <>
                              <ShoppingBag size={15} />
                              Adicionar ao carrinho
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  )
                })}
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
            onClick={() => setCart([])}
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
