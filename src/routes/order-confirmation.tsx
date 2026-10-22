import { Link, useSearch } from '@tanstack/react-router'
import {
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Receipt,
} from 'lucide-react'
import { getOrderById } from '../order'

export function OrderConfirmationPage() {
  const { orderId } = useSearch({
    from: '/order-confirmation',
  })

  const order = getOrderById(orderId)

  const isConfirmed = order?.status === 'confirmed'
  const isRejected = order?.status === 'rejected'

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0e0f] px-6 py-12 text-white">
        <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#15191b] p-8 text-center">
          <h1 className="text-2xl font-black">
            Pedido não encontrado
          </h1>

          <p className="mt-4 text-white/60">
            Não encontramos um pedido associado a este endereço.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#ff792d] px-6 py-3 font-bold text-[#1b1009] hover:bg-[#ff9456]"
          >
            Voltar ao marketplace
          </Link>
        </section>
      </main>
    )
  }

  const statusLabel = isConfirmed
    ? 'Confirmado (simulado)'
    : isRejected
      ? 'Recusado (simulado)'
      : 'Pendente'

  const statusColor = isConfirmed
    ? 'text-emerald-400'
    : isRejected
      ? 'text-red-400'
      : 'text-yellow-400'

  return (
    <main className="min-h-screen bg-[#0b0e0f] px-6 py-12 text-white">
      <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-[#15191b] p-6 sm:p-10">
        <div className="text-center">
          {isConfirmed ? (
            <CheckCircle2
              size={56}
              className="mx-auto text-emerald-400"
            />
          ) : (
            <ShoppingBag
              size={56}
              className="mx-auto text-red-400"
            />
          )}

          <p
            className={`mt-5 text-sm font-semibold uppercase tracking-widest ${statusColor}`}
          >
            {isConfirmed
              ? 'Pedido confirmado'
              : isRejected
                ? 'Pagamento recusado'
                : 'Pedido pendente'}
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            {isConfirmed
              ? 'Compra realizada!'
              : isRejected
                ? 'Não foi possível concluir a compra'
                : 'Aguardando confirmação'}
          </h1>

          <p className="mt-4 leading-7 text-white/60">
            {isConfirmed
              ? 'Seu pedido foi registrado na simulação do Jungle Gaming. Nenhuma transação real foi realizada.'
              : isRejected
                ? 'O pagamento simulado foi recusado. Seus itens continuam no carrinho para você tentar novamente.'
                : 'Seu pedido ainda não foi confirmado.'}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 p-5">
          <div className="flex items-center gap-3">
            <Receipt size={22} className="text-[#ff9456]" />
            <h2 className="text-lg font-bold">
              Detalhes do pedido
            </h2>
          </div>

          <p className="mt-4 break-all text-sm text-white/50">
            Número: {order.id}
          </p>

          <div className="mt-5 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 border-b border-white/10 pb-4"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {item.collection}
                  </p>
                </div>

                <p className="shrink-0 font-bold">
                  Ξ {item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="font-bold">Total</span>
            <span className="text-xl font-black text-[#ff9456]">
              Ξ {order.total.toFixed(2)} ETH
            </span>
          </div>

          <div className="mt-5 space-y-2 text-sm text-white/50">
            <p>Carteira: {order.wallet}</p>

            {order.transactionRef && (
              <p className="break-all">
                Referência da transação: {order.transactionRef}
              </p>
            )}

            <p>
              Status:{' '}
              <span className={statusColor}>{statusLabel}</span>
            </p>

            <p>
              Data: {new Date(order.createdAt).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff792d] px-6 py-4 font-bold text-[#1b1009] transition-colors hover:bg-[#ff9456]"
        >
          <ShoppingBag size={19} />
          Voltar ao marketplace
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  )
}