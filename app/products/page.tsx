'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  SimpleGrid, 
  Input,
  VStack,
  HStack,
  Text,
  chakra
} from '@chakra-ui/react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const CategorySelect = chakra('select');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <Container maxW="container.xl" py={10}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Our Products
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Browse our complete collection of organic and herbal products
          </Text>
        </Box>

        {/* Filters */}
        <HStack gap={4} flexWrap="wrap">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW={{ base: 'full', md: '300px' }}
          />
          
          <CategorySelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            maxW={{ base: 'full', md: '200px' }}
            padding={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.300"
            bg="white"
            _focus={{ outline: 'none', borderColor: 'green.500', boxShadow: '0 0 0 1px var(--chakra-colors-green-500)' }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </CategorySelect>
        </HStack>

        {/* Products Grid */}
        <Box>
          <Text mb={4} color="gray.600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>

          {filteredProducts.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color="gray.500">
                No products found matching your criteria.
              </Text>
            </Box>
          )}
        </Box>
      </VStack>
    </Container>
    <Footer />
    </>
  );
}
