import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from '../lib/prismadb'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyPassword } from "./authUtils";
// import { async } from '../app/api/register/route';
// import { signIn } from 'next-auth/react';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
        // GitHubProvider({
        //   profile(profile: GithubProfile) {
        //     console.log(profile)
        //     return {
        //       ...profile,
        //       id: profile.id.toString(),
        //       email: profile.email
        //     }
        //   },
        //   clientId: process.env.GITHUB_ID as string,
        //   clientSecret: process.env.GITHUB_SECRET as string
        // }),
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_CLIENT_ID,
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
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
      callbacks: {
        // === Only runs & returns a user on sign in ===
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
        },
        // async signIn({ profile }) {
        //   console.log(profile)
        //   try {
        //     const isUserInDB = await prisma.user.findUnique({
        //       where: {
        //         email: profile?.email
        //       }
        //     }) 
  
        //     if(!isUserInDB) {
        //       const newUser = await prisma.user.create({
        //         data: {
        //           email: profile?.email,
        //           name: profile?.name
        //         }
        //       })
        //     }
        //     return true
        //   }
        //   catch(error: any) {
        //     console.log(error) 
        //     return false
        //   }
        // }
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
