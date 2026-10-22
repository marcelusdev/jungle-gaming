
export type User = {
  id: string
  name: string
  email: string
}

type StoredUser = User & {
  password: string
}

const SESSION_KEY = 'jungle-gaming-session'
const USERS_KEY = 'jungle-gaming-users'

function getUsers(): StoredUser[] {
  try {
    const saved = localStorage.getItem(USERS_KEY)
    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (user): user is StoredUser =>
        typeof user === 'object' &&
        user !== null &&
        'id' in user &&
        'name' in user &&
        'email' in user &&
        'password' in user &&
        typeof user.id === 'string' &&
        typeof user.name === 'string' &&
        typeof user.email === 'string' &&
        typeof user.password === 'string',
    )
  } catch {
    return []
  }
}

export function registerUser(
  name: string,
  email: string,
  password: string,
): User {
  const cleanName = name.trim()
  const cleanEmail = email.trim().toLowerCase()

  if (!cleanName || !cleanEmail.includes('@') || password.length < 6) {
    throw new Error('Confira seus dados e use uma senha de pelo menos 6 caracteres.')
  }

  const users = getUsers()

  if (users.some((user) => user.email === cleanEmail)) {
    throw new Error('Este e-mail já está cadastrado.')
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: cleanEmail,
    password,
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))

  const { id, name: userName, email: userEmail } = newUser
  return { id, name: userName, email: userEmail }
}

export function loginUser(email: string, password: string): User {
  const cleanEmail = email.trim().toLowerCase()

  const user = getUsers().find(
    (item) => item.email === cleanEmail && item.password === password,
  )

  if (!user) {
    throw new Error('E-mail ou senha incorretos.')
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

export function getCurrentUser(): User | null {
  try {
    const savedUser = localStorage.getItem(SESSION_KEY)
    if (!savedUser) return null

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
