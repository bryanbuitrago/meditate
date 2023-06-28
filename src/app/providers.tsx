'use client'

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

interface Props {
  children?: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}

export default function NextAuthSessionProvider({ children }: Props) {
  return (
    <ChakraProvider>
      <CacheProvider>
        <SessionProvider>{children}</SessionProvider>
      </CacheProvider>
    </ChakraProvider>
  );
}
