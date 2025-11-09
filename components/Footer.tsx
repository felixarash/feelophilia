'use client';

import { Box, Container, Text, Stack, HStack, Link as ChakraLink, VStack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box as="footer" bg="green.700" color="white" mt="auto">
      <Container maxW="container.xl" py={8}>
        <VStack gap={6}>
          <HStack justify="space-between" flexWrap="wrap">
            <VStack gap={2} align="flex-start">
              <Text fontSize="lg" fontWeight="bold">Herbal Oasis</Text>
              <Text fontSize="sm">Premium organic & herbal products</Text>
            </VStack>
            
            <HStack gap={4}>
              <ChakraLink href="#" _hover={{ color: 'green.200' }}>
                <FaFacebook size={24} />
              </ChakraLink>
              <ChakraLink href="#" _hover={{ color: 'green.200' }}>
                <FaInstagram size={24} />
              </ChakraLink>
              <ChakraLink href="#" _hover={{ color: 'green.200' }}>
                <FaTwitter size={24} />
              </ChakraLink>
            </HStack>
          </HStack>

          <Box borderTop="1px" borderColor="green.600" pt={4}>
            <Text fontSize="sm" textAlign="center">
              © {new Date().getFullYear()} Herbal Oasis. All rights reserved.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
