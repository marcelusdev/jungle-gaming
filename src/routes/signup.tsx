
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { registerUser, saveSession } from '../auth'

export function SignupPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setIsSubmitting(true)

      try {
        const user = registerUser(name, email, password)

        saveSession(user)

        navigate({ to: '/' })
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível realizar o cadastro.',
        )
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
            <UserPlus size={24} />
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            Crie sua conta
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Entre no universo Jungle Gaming.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <div>
              <label htmlFor="signup-name" className="mb-2 block text-sm font-medium text-white/70">
                Nome completo
              </label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[#ff792d]"
              />
            </div>

            <div>
              <label htmlFor="signup-email" className="mb-2 block text-sm font-medium text-white/70">
                E-mail
              </label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-password" className="mb-2 block text-sm font-medium text-white/70">
                Senha
              </label>
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Pelo menos 6 caracteres"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-colors focus:border-[#ff792d]"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#ff792d] px-5 py-4 font-bold text-[#1b1009] transition-colors hover:bg-[#ff9456] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/50">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#ff9456] hover:text-white"
            >
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
