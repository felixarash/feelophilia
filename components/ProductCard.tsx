'use client';

import { Box, Image, Text, Button, VStack, Link as ChakraLink } from '@chakra-ui/react';
import { useCart } from '@/context/CartContext';
import NextLink from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
      <ChakraLink
        as={NextLink}
        href={`/product/${product.id}`}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
        bg="white"
        cursor="pointer"
        display="block"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          height="200px"
          width="100%"
          objectFit="cover"
        />
        
        <VStack p={4} gap={3} align="stretch">
          <Text fontSize="xs" fontWeight="bold" color="green.600">
            {product.category}
          </Text>
          
          <Text fontSize="lg" fontWeight="bold" lineClamp={1}>
            {product.name}
          </Text>
          
          <Text fontSize="sm" color="gray.600" lineClamp={2}>
            {product.description}
          </Text>
          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold" color="green.600">
              ${product.price.toFixed(2)}
            </Text>
            
            <Button
              colorPalette="green"
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </VStack>
      </ChakraLink>
  );
}
