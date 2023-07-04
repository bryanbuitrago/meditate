import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// User next-auth adapter instead
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
    pages: {
        signIn: '/login'
    }
}
