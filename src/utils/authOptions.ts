import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
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

            console.log('credentials= ', email, password)

            const user = await prisma.user.findUnique({
              where: {
                email: credentials?.email
              }
            })
            console.log('User From DB: ', user)

            const isValid = credentials?.password === user?.password

            console.log({id: user?.id, user: user?.username})

            if(isValid) {
              // return {id: user?.id, user: user?.username }
              return { ...user }
            }
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
    }
}
