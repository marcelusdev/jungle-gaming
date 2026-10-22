
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, LogIn } from 'lucide-react'
import { api } from '../lib/api'
import { saveSession, type User } from '../auth'

export function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await api.post<User>('/auth/login', {
        email,
        password,
      })

      saveSession(response.data)

      navigate({ to: '/' })
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err
      ) {
        const response = err.response

        if (
          typeof response === 'object' &&
          response !== null &&
          'data' in response
        ) {
          const data = response.data

          if (
            typeof data === 'object' &&
            data !== null &&
            'message' in data &&
            typeof data.message === 'string'
          ) {
            setError(data.message)
          } else {
            setError('Não foi possível entrar na sua conta.')
          }
        } else {
          setError('Não foi possível entrar na sua conta.')
        }
      } else {
        setError('Não foi possível entrar na sua conta.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0e0f] px-5 py-12 text-white">
      <section className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#ff9456]"
        >
          <ArrowLeft size={18} />
          Voltar ao marketplace
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff792d]/15 text-[#ff9456]">
            <LogIn size={24} />
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            Bem-vindo de volta
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Entre na sua conta Jungle Gaming.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium text-white/70"
              >
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@exemplo.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[#ff792d]"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-medium text-white/70"
              >
                Senha
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Sua senha"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[#ff792d]"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#ff792d] px-5 py-4 font-bold text-[#1b1009] transition-colors hover:bg-[#ff9456] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/50">
            Ainda não tem uma conta?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#ff9456] hover:text-white"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
