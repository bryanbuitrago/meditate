import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
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
            };

            const user = credentials
            console.log(user)
        //   async authorize(credentials) {
        //     console.log('credentials=', credentials)
            return { user }
          }
        })
      ],
    pages: {
        signIn: '/login'
    }
}
