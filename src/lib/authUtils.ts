import { hash } from 'bcrypt'

// Hash Password 
export async function hashPassword(password: string) {
    const hashedPassword: string = await hash(password, 12)
    return hashedPassword
}
