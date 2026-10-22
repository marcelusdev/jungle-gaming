
export type User = {
  id: string
  name: string
  email: string
}

const SESSION_KEY = 'jungle-gaming-session'

export function getCurrentUser(): User | null {
  try {
    const savedUser = localStorage.getItem(SESSION_KEY)

    if (!savedUser) {
      return null
    }

    const user: unknown = JSON.parse(savedUser)

    if (
      typeof user !== 'object' ||
      user === null ||
      !('id' in user) ||
      !('name' in user) ||
      !('email' in user) ||
      typeof user.id !== 'string' ||
      typeof user.name !== 'string' ||
      typeof user.email !== 'string'
    ) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  } catch {
    return null
  }
}

export function saveSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY)
}
