
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Wallet,
  Plus,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react'
import { getCurrentUser } from '../auth'

type SavedWallet = {
  id: string
  userId: string
  name: string
  address: string
  network: string
  createdAt: string
}

const STORAGE_KEY = 'jungle-gaming-wallets'

const networks = [
  'Ethereum',
  'Polygon',
  'Arbitrum',
  'Base',
]

function getSavedWallets(): SavedWallet[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item): item is SavedWallet =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.userId === 'string' &&
        typeof item.name === 'string' &&
        typeof item.address === 'string' &&
        typeof item.network === 'string' &&
        typeof item.createdAt === 'string',
    )
  } catch {
    return []
  }
}

export function WalletsPage() {
  const user = getCurrentUser()

  const [wallets, setWallets] = useState<SavedWallet[]>(() =>
    user
      ? getSavedWallets().filter(
          (wallet) => wallet.userId === user.id,
        )
      : [],
  )

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('Ethereum')
  const [error, setError] = useState('')
  const [copiedId, setCopiedId] = useState('')

  function saveWallets(updatedWallets: SavedWallet[]) {
    const allWallets = getSavedWallets().filter(
      (wallet) => wallet.userId !== user?.id,
    )

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...allWallets, ...updatedWallets]),
    )

    setWallets(updatedWallets)
  }

  function handleAddWallet(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!user) return

    const cleanName = name.trim()
    const cleanAddress = address.trim()

    if (!cleanName || !cleanAddress) {
      setError('Preencha o nome e o endereço da carteira.')
      return
    }

    if (cleanAddress.length < 10) {
      setError('Informe um endereço de carteira válido.')
      return
    }

    const alreadyExists = wallets.some(
      (wallet) =>
        wallet.address.toLowerCase() === cleanAddress.toLowerCase() &&
        wallet.network === network,
    )

    if (alreadyExists) {
      setError('Essa carteira já está cadastrada nessa rede.')
      return
    }

    const newWallet: SavedWallet = {
      id: crypto.randomUUID(),
      userId: user.id,
      name: cleanName,
      address: cleanAddress,
      network,
      createdAt: new Date().toISOString(),
    }

    saveWallets([...wallets, newWallet])
    setName('')
    setAddress('')
    setNetwork('Ethereum')
  }

  function handleRemoveWallet(id: string) {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover esta carteira?',
    )

    if (!confirmed) return

    saveWallets(wallets.filter((wallet) => wallet.id !== id))
  }

  async function handleCopyAddress(wallet: SavedWallet) {
    try {
      await navigator.clipboard.writeText(wallet.address)
      setCopiedId(wallet.id)

      window.setTimeout(() => {
        setCopiedId('')
      }, 2000)
    } catch {
      setError('Não foi possível copiar o endereço automaticamente.')
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0b0e0f] px-5 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#121617] p-8 text-center">
          <Wallet className="mx-auto mb-4 h-12 w-12 text-[#ff792d]" />

          <h1 className="mb-3 text-2xl font-bold">
            Entre na sua conta
          </h1>

          <p className="mb-6 text-sm text-gray-400">
            Você precisa estar conectado à sua conta para gerenciar suas carteiras.
          </p>

          <Link
            to="/login"
            className="inline-flex rounded-xl bg-[#ff792d] px-6 py-3 font-semibold text-black transition hover:bg-[#ff9456]"
          >
            Fazer login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0b0e0f] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Voltar ao perfil
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <div className="rounded-2xl bg-[#ff792d]/10 p-4">
            <Wallet className="h-8 w-8 text-[#ff792d]" />
          </div>

          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Minhas carteiras
            </h1>

            <p className="mt-2 text-gray-400">
              Gerencie suas carteiras para compras na Jungle Gaming.
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

          <div>
            <p className="font-medium text-emerald-300">
              Ambiente de demonstração
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Os cadastros são simulados para este projeto. Nunca informe frases de recuperação ou chaves privadas.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="h-fit rounded-2xl border border-white/10 bg-[#121617] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-[#ff792d]/10 p-3">
                <Plus className="h-5 w-5 text-[#ff792d]" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Adicionar carteira
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Cadastre um endereço para usar na demonstração.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddWallet} className="space-y-5">
              <div>
                <label
                  htmlFor="wallet-name"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Nome da carteira
                </label>

                <input
                  id="wallet-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ex.: Minha carteira principal"
                  maxLength={50}
                  className="w-full rounded-xl border border-white/10 bg-[#0b0e0f] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#ff792d]"
                />
              </div>

              <div>
                <label
                  htmlFor="wallet-address"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Endereço público
                </label>

                <input
                  id="wallet-address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Cole o endereço público da carteira"
                  maxLength={150}
                  className="w-full rounded-xl border border-white/10 bg-[#0b0e0f] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#ff792d]"
                />
              </div>

              <div>
                <label
                  htmlFor="wallet-network"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Rede blockchain
                </label>

                <select
                  id="wallet-network"
                  value={network}
                  onChange={(event) => setNetwork(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0b0e0f] px-4 py-3 text-white outline-none transition focus:border-[#ff792d]"
                >
                  {networks.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff792d] px-5 py-3 font-semibold text-black transition hover:bg-[#ff9456]"
              >
                <Plus size={18} />
                Cadastrar carteira
              </button>
            </form>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Carteiras cadastradas
              </h2>

              <span className="rounded-full border border-white/10 bg-[#121617] px-3 py-1 text-sm text-gray-300">
                {wallets.length} {wallets.length === 1 ? 'carteira' : 'carteiras'}
              </span>
            </div>

            {wallets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-[#121617]/60 px-6 py-12 text-center">
                <Wallet className="mx-auto mb-4 h-10 w-10 text-gray-600" />

                <h3 className="font-semibold">
                  Nenhuma carteira por aqui
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm text-gray-400">
                  Cadastre sua primeira carteira usando o formulário ao lado.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <article
                    key={wallet.id}
                    className="rounded-2xl border border-white/10 bg-[#121617] p-5"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-xl bg-[#ff792d]/10 p-3">
                          <Wallet className="h-5 w-5 text-[#ff792d]" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold">
                            {wallet.name}
                          </h3>

                          <span className="mt-1 inline-block rounded-full border border-[#ff792d]/20 bg-[#ff792d]/10 px-2.5 py-1 text-xs text-[#ff9456]">
                            {wallet.network}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveWallet(wallet.id)}
                        aria-label={`Remover carteira ${wallet.name}`}
                        title="Remover carteira"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="mb-2 text-xs text-gray-500">
                      Endereço público
                    </p>

                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0b0e0f] p-3">
                      <p className="min-w-0 flex-1 break-all text-sm text-gray-300">
                        {wallet.address}
                      </p>

                      <button
                        type="button"
                        onClick={() => void handleCopyAddress(wallet)}
                        aria-label="Copiar endereço"
                        title="Copiar endereço"
                        className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                      >
                        {copiedId === wallet.id ? (
                          <Check size={17} className="text-emerald-400" />
                        ) : (
                          <Copy size={17} />
                        )}
                      </button>
                    </div>

                    <p className="mt-3 text-xs text-gray-500">
                      Cadastrada em{' '}
                      {new Date(wallet.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
