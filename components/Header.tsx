'use client';

import { Box, Container, Flex, Text, IconButton, Badge, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import NextLink from 'next/link';

const HerbalOasisLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#48BB78" opacity="0.2"/>
    <path d="M20 8C20 8 15 12 15 18C15 21 17 23 20 23C23 23 25 21 25 18C25 12 20 8 20 8Z" fill="#48BB78"/>
    <path d="M20 23C20 23 16 26 16 30C16 32 17.5 33.5 20 33.5C22.5 33.5 24 32 24 30C24 26 20 23 20 23Z" fill="#38A169"/>
    <circle cx="13" cy="16" r="2.5" fill="#68D391"/>
    <circle cx="27" cy="16" r="2.5" fill="#68D391"/>
  </svg>
);

export default function Header() {
  const { getCartCount } = useCart();

  return (
    <Box as="header" bg="white" boxShadow="sm" position="sticky" top="0" zIndex="1000">
      <Container maxW="container.xl">
        <Flex h="70px" alignItems="center" justifyContent="space-between">
          <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
            <Flex alignItems="center" gap={3}>
              <HerbalOasisLogo />
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                Herbal Oasis
              </Text>
            </Flex>
          </ChakraLink>

          <HStack gap={8}>
            <ChakraLink as={NextLink} href="/" fontSize="md" fontWeight="medium" _hover={{ color: 'green.500' }}>
              Home
            </ChakraLink>
            <ChakraLink as={NextLink} href="/products" fontSize="md" fontWeight="medium" _hover={{ color: 'green.500' }}>
              Products
            </ChakraLink>
            
            <ChakraLink as={NextLink} href="/cart">
              <Box position="relative">
                <IconButton
                  aria-label="Shopping cart"
                  variant="ghost"
                  colorPalette="green"
                  _icon={{ color: 'green.700' }}
                >
                  <FiShoppingCart size={24} />
                </IconButton>
                {getCartCount() > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    colorPalette="red"
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {getCartCount()}
                  </Badge>
                )}
              </Box>
            </ChakraLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
