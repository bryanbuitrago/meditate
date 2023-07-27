import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyPassword } from "./authUtils";


const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
         CredentialsProvider({

          name: 'Credentials',

          credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' }
          },
          async authorize(credentials) {

            // If credentials don't have email or password throw new error
            if (!credentials?.email || !credentials?.password) {
              throw new Error('Invalid Credentials')
            }

            // Search for user in db
            const user = await prisma.user.findUnique({
              where: {
                email: credentials?.email
              }
            })

            // If no user is found or no password is stored throw new error
            if(!user || !user?.password) {
              throw new Error('Invalid Credentials')
            }

            // Verify passwords match (credentails-user & db-user) passwords match
            const isValid = await verifyPassword(
              credentials?.password,
              user?.password
            )

            // If passwords don't match throw new error
            if(!isValid) {
              throw new Error('Could not log you in!')
            }

            // return user if passwords match
            return user
          }
        })
      ],
      callbacks:{
        async jwt({ token, user, session }) {
          console.log('jwt callback', { token, user, session})

          // pass in user id and email address to token
          if(user) {
            return {
              ...token,
              id: user.id,
              email: user.email,
            }
          }
          return token
        },
        async session({ session, token, user }) {
          console.log('session callback', { session, token, user })
          return {
            ...session,
            user : {
              ...session.user,
              id: token.id,
              email: token.email,
            }
          }
        }
      },
    pages: {
        signIn: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}
