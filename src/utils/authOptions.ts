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
            const { email, password } = credentials as {
              email: string;
              password: string;
            }
            // Check if incoming user request credentials are valid
            if (!credentials?.email || !credentials?.password) {
              throw new Error('Invalid Credentials')
            }
            const user = await prisma.user.findUnique({
              where: {
                email: credentials?.email
              }
            })

            // Check if user from db exists & has password stored

            if(!user || !user?.password) {
              throw new Error('Invalid Credentials')
            }

            // Verify passwords match (credentails user & db user) passwords match
            const isValid = await verifyPassword(
              credentials?.password,
              user?.password
            )

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
          return session 
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
