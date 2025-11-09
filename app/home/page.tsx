'use client';

import { Box, Container, Heading, Text, Button, SimpleGrid, VStack } from '@chakra-ui/react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import NextLink from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <Header />
      <Box>
      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        py={20}
        textAlign="center"
      >
        <Container maxW="container.xl">
          <VStack gap={6}>
            <Heading as="h1" size="2xl" fontWeight="bold">
              Welcome to Herbal Oasis
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Discover the finest organic and herbal products for your wellness journey. 
              Pure, natural, and sustainably sourced.
            </Text>
            <NextLink href="/products">
              <Button
                size="lg"
                colorPalette="green"
                bg="green.500"
                _hover={{ bg: 'green.600' }}
              >
                Shop Now
              </Button>
            </NextLink>
          </VStack>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxW="container.xl" py={16}>
        <VStack gap={10}>
          <Box textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Featured Products
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Handpicked selections from our premium collection
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="full">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>

          <NextLink href="/products">
            <Button size="lg" colorPalette="green" variant="outline">
              View All Products
            </Button>
          </NextLink>
        </VStack>
      </Container>

      {/* Why Choose Us */}
      <Box bg="gray.50" py={16}>
        <Container maxW="container.xl">
          <VStack gap={8}>
            <Heading as="h2" size="xl" textAlign="center">
              Why Choose Herbal Oasis?
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
              <Box textAlign="center" p={6}>
                <Text fontSize="4xl" mb={4}>🌿</Text>
                <Heading as="h3" size="md" mb={3}>100% Organic</Heading>
                <Text color="gray.600">
                  All our products are certified organic and free from harmful chemicals
                </Text>
              </Box>
              
              <Box textAlign="center" p={6}>
                <Text fontSize="4xl" mb={4}>🚚</Text>
                <Heading as="h3" size="md" mb={3}>Fast Shipping</Heading>
                <Text color="gray.600">
                  Quick and reliable delivery to your doorstep
                </Text>
              </Box>
              
              <Box textAlign="center" p={6}>
                <Text fontSize="4xl" mb={4}>💚</Text>
                <Heading as="h3" size="md" mb={3}>Eco-Friendly</Heading>
                <Text color="gray.600">
                  Sustainable packaging and environmentally conscious practices
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      </Box>
      <Footer />
    </>
  );
}
