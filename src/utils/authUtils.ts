import { hash, compare } from 'bcrypt'

// Hash Password 
export async function hashPassword(password: string) {
    const hashedPassword: string = await hash(password, 12)
    return hashedPassword
}

// Verify passwords match
export async function verifyPassword(password: string, hashedPassword: string) {
    const isMatch: boolean = await compare(password, hashedPassword)
    return isMatch
}
