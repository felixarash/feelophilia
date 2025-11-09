'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Image,
  VStack,
  HStack
} from '@chakra-ui/react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack gap={4}>
          <Heading>Product Not Found</Heading>
          <Button colorPalette="green" onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </VStack>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/cart');
  };

  return (
    <>
      <Header />
      <Container maxW="container.xl" py={10}>
        <Box>
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            mb={6}
          >
            ← Back
          </Button>

          <Box display={{ base: 'block', md: 'grid' }} gridTemplateColumns="1fr 1fr" gap={10}>
            <Box>
              <Image
                src={product.imageUrl}
                alt={product.name}
                borderRadius="lg"
                width="100%"
                objectFit="cover"
              />
            </Box>

            <VStack align="stretch" gap={6}>
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="green.600" mb={2}>
                  {product.category}
                </Text>
                <Heading as="h1" size="2xl" mb={4}>
                  {product.name}
                </Heading>
                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                  ${product.price.toFixed(2)}
                </Text>
              </Box>

              <Box borderTopWidth="1px" />

              <Box>
                <Heading as="h2" size="md" mb={3}>
                  Description
                </Heading>
                <Text color="gray.700" lineHeight="tall">
                  {product.description}
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="md" mb={3}>
                  Product Details
                </Heading>
                <VStack align="stretch" gap={2}>
                  <HStack>
                    <Text fontWeight="bold">Category:</Text>
                    <Text>{product.category}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Product ID:</Text>
                    <Text>#{product.id}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Status:</Text>
                    <Text color="green.600">In Stock</Text>
                  </HStack>
                </VStack>
              </Box>

              <Button
                colorPalette="green"
                size="lg"
                onClick={handleAddToCart}
                w="full"
              >
                Add to Cart
              </Button>
            </VStack>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
