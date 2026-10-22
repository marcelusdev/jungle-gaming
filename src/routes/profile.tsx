
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  UserRound,
  Mail,
  ShoppingBag,
  Heart,
  CalendarDays,
  Wallet,
  ReceiptText,
} from 'lucide-react'
import { getCurrentUser } from '../auth'
import { getOrders } from '../order'

export function ProfilePage() {
  const user = getCurrentUser()
  const orders = getOrders()
    .filter((order) => order.userId === user?.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
  )

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0e0f] px-5 text-white">
        <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <UserRound
            size={40}
            className="mx-auto mb-5 text-[#ff9456]"
          />

          <h1 className="text-2xl font-black">
            Entre na sua conta
          </h1>

          <p className="mt-3 text-sm text-white/50">
            Faça login para acessar seu perfil de colecionador.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-[#ff792d] px-6 py-3 font-bold text-[#1b1009] transition hover:bg-[#ff9456]"
          >
            Entrar
          </Link>

          <div>
            <Link
              to="/"
              className="mt-5 inline-block text-sm text-white/50 hover:text-white"
            >
              Voltar ao marketplace
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0b0e0f] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#ff9456]"
        >
          <ArrowLeft size={18} />
          Voltar ao marketplace
        </Link>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="h-32 bg-gradient-to-r from-[#7b3215] via-[#ff792d] to-[#42200f]" />

          <div className="px-6 pb-8 sm:px-9">
            <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#0b0e0f] bg-[#211811] text-[#ff9456]">
              <UserRound size={42} />
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9456]">
                Colecionador
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {user.name}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
                <Mail size={16} />
                {user.email}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <ShoppingBag
                  size={23}
                  className="text-[#ff9456]"
                />
                <h2 className="mt-4 font-bold">Meus pedidos</h2>
                <p className="mt-2 text-3xl font-black">
                  {orders.length}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {orders.length === 1
                    ? 'pedido registrado'
                    : 'pedidos registrados'}
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Heart
                  size={23}
                  className="text-[#ff9456]"
                />
                <h2 className="mt-4 font-bold">NFTs favoritos</h2>
                <p className="mt-2 text-sm text-white/50">
                  Seus colecionáveis favoritos ficam disponíveis
                  para explorar no marketplace.
                </p>
                <Link
                  to="/"
                  className="mt-4 inline-flex text-sm font-semibold text-[#ff9456] hover:text-white"
                >
                  Explorar NFTs
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight">
              Histórico de compras
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Consulte os detalhes dos seus pedidos registrados.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
              <ShoppingBag
                size={35}
                className="mx-auto text-white/30"
              />
              <h3 className="mt-4 text-lg font-bold">
                Nenhuma compra por enquanto
              </h3>
              <p className="mt-2 text-sm text-white/50">
                Quando você concluir uma compra, ela aparecerá aqui.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex rounded-xl bg-[#ff792d] px-5 py-3 font-bold text-[#1b1009] transition hover:bg-[#ff9456]"
              >
                Explorar marketplace
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold">
                          Pedido #{order.id.slice(0, 8).toUpperCase()}
                        </h3>
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                          Confirmado
                        </span>
                      </div>

                      <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
                        <CalendarDays size={15} />
                        {new Date(order.createdAt).toLocaleString(
                          'pt-BR',
                          {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          },
                        )}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs text-white/40">
                        Valor total
                      </p>
                      <p className="mt-1 text-2xl font-black text-[#ff9456]">
                        {order.total.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="my-5 border-t border-white/10" />

                  <h4 className="mb-3 text-sm font-semibold text-white/70">
                    NFTs adquiridos
                  </h4>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-white/40">
                            {item.collection}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold">
                          {item.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 rounded-xl border border-white/10 p-4">
                    <div className="flex items-start gap-3">
                      <Wallet
                        size={17}
                        className="mt-0.5 shrink-0 text-[#ff9456]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-white/40">
                          Carteira utilizada
                        </p>
                        <p className="mt-1 break-all text-sm text-white/70">
                          {order.wallet}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <ReceiptText
                        size={17}
                        className="mt-0.5 shrink-0 text-[#ff9456]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-white/40">
                          Referência da transação simulada
                        </p>
                        <p className="mt-1 break-all font-mono text-sm text-white/70">
                          {order.transactionRef}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
