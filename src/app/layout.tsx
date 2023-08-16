import { Providers } from './providers'
import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from './providers';
import Navbar from './(components)/navbar/Navbar';
import getCurrentUser from './actions/user/userActions';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// Make function async to get the current user
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //  Get the current user
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body>
        <Providers>
          <NextAuthSessionProvider>
            {/* Pass current user to navbar */}
            <Navbar currentUser={currentUser} />
              {children}
          </NextAuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
