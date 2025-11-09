'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { CartProvider } from '@/context/CartContext';
import { EmotionCacheProvider } from './emotion-cache';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider>
      <ChakraProvider value={defaultSystem}>
        <CartProvider>
          {children}
        </CartProvider>
      </ChakraProvider>
    </EmotionCacheProvider>
  );
}
