
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  UserRound,
  Wallet,
} from 'lucide-react'
import { getCurrentUser, logout } from '../auth'

type HeaderProps = {
  search: string
  onSearchChange: (value: string) => void
  cartCount: number
}

export function Header({
  search,
  onSearchChange,
  cartCount,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [user, setUser] = useState(() => getCurrentUser())

  function connectWallet() {
    if (walletAddress) {
      setWalletAddress(null)
      return
    }

    const accepted = window.confirm(
      'Deseja conectar sua carteira ao Jungle Gaming?',
    )

    if (!accepted) {
      alert('Conexão recusada.')
      return
    }

    setWalletAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')
  }

  function handleLogout() {
    logout()
    setUser(null)
    setWalletAddress(null)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#100e0c]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 md:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-3">
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
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
          <a href="#explore" className="transition hover:text-[#ff792d]">
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
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar NFTs..."
              aria-label="Buscar NFTs"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Limpar busca"
              >
                <X size={15} />
              </button>
            )}
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span
                className="max-w-28 truncate text-sm text-white/80"
                title={user.name}
              >
                Olá, {user.name}
              </span>

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-[#ff792d]/30 px-3 py-3 text-sm text-[#ff9456] transition hover:bg-[#ff792d]/10 hover:text-white"
              >
                <UserRound size={16} />
                Meu perfil
              </Link>

              <Link
                to="/wallets"
                className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Wallet size={16} />
                Carteiras
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                title="Sair da conta"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="rounded-xl px-3 py-3 text-sm text-white/70 transition hover:text-white"
              >
                Entrar
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-[#ff792d] px-4 py-3 text-sm font-bold text-[#1a1009] transition hover:bg-[#ff9456]"
              >
                Criar conta
              </Link>
            </div>
          )}

          <Link
            to="/cart"
            aria-label={`Abrir carrinho com ${cartCount} itens`}
            className="relative flex items-center justify-center rounded-xl p-2 text-white transition-colors hover:bg-white/10"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff792d] px-1 text-[10px] font-bold text-[#1b1009]">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl bg-[#ff792d] px-4 py-3 text-sm font-bold text-[#1a1009] transition hover:bg-[#ff9456] sm:flex"
            onClick={connectWallet}
          >
            {walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : 'Conectar carteira'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-white/10 p-3 lg:hidden"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#171310] p-5 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm text-white/70">
            <a
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explorar NFTs
            </a>
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
            >
              Coleções
            </a>
            <a
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comunidade
            </a>

            {user ? (
              <>
                <p className="border-t border-white/10 pt-4 text-white">
                  Olá, {user.name}
                </p>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-[#ff9456] transition hover:text-white"
                >
                  <UserRound size={16} />
                  Meu perfil
                </Link>

                <Link
                  to="/wallets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 transition hover:text-white"
                >
                  <Wallet size={16} />
                  Minhas carteiras
                </Link>

                <button
                  type="button"
                  className="flex items-center gap-2 text-left text-white/70 transition hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Sair da conta
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-t border-white/10 pt-4"
                >
                  Entrar
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#ff9456]"
                >
                  Criar conta
                </Link>
              </>
            )}

            <button
              type="button"
              className="flex items-center gap-2 text-left text-[#ff792d]"
              onClick={connectWallet}
            >
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)} — Desconectar carteira`
                : 'Conectar carteira'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
