'use client';

import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Image,
  VStack,
  HStack,
  IconButton
} from '@chakra-ui/react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <Container maxW="container.xl" py={20}>
          <VStack gap={6}>
            <Text fontSize="6xl">🛒</Text>
            <Heading>Your Cart is Empty</Heading>
            <Text color="gray.600">Add some products to get started!</Text>
            <NextLink href="/products">
              <Button colorPalette="green" size="lg">
                Shop Products
              </Button>
            </NextLink>
          </VStack>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
    <Container maxW="container.lg" py={10}>
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="2xl">
          Shopping Cart
        </Heading>

        {/* Cart Items */}
        <VStack gap={4} align="stretch">
          {cart.map(item => (
            <Box
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
            >
              <HStack gap={4} align="flex-start">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />

                <VStack flex="1" align="stretch" gap={2}>
                  <Heading as="h3" size="md">
                    {item.name}
                  </Heading>
                  <Text fontSize="lg" fontWeight="bold" color="green.600">
                    PKR {item.price.toFixed(2)}
                  </Text>

                  <HStack gap={3} mt={2}>
                    <HStack>
                      <IconButton
                        aria-label="Decrease quantity"
                        size="sm"
                        variant="outline"
                        colorPalette="gray"
                        color="gray.700"
                        borderColor="gray.300"
                        _icon={{ color: 'gray.700' }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <FiMinus />
                      </IconButton>
                      <Text fontWeight="bold" minW="30px" textAlign="center">
                        {item.quantity}
                      </Text>
                      <IconButton
                        aria-label="Increase quantity"
                        size="sm"
                        variant="outline"
                        colorPalette="gray"
                        color="gray.700"
                        borderColor="gray.300"
                        _icon={{ color: 'gray.700' }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FiPlus />
                      </IconButton>
                    </HStack>

                    <IconButton
                      aria-label="Remove from cart"
                      colorPalette="red"
                      variant="ghost"
                      color="red.600"
                      _icon={{ color: 'red.600' }}
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </VStack>

                <VStack align="flex-end">
                  <Text fontSize="sm" color="gray.600">
                    Subtotal
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    PKR {(item.price * item.quantity).toFixed(2)}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>

        <Box borderTopWidth="1px" />

        {/* Cart Summary */}
        <Box p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
          <VStack gap={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg">Subtotal:</Text>
              <Text fontSize="lg">PKR {getCartTotal().toFixed(2)}</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text fontSize="lg">Shipping:</Text>
              <Text fontSize="lg" color="green.600">FREE</Text>
            </HStack>
            
            <Box borderTopWidth="1px" />
            
            <HStack justify="space-between">
              <Text fontSize="2xl" fontWeight="bold">Total:</Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                PKR {getCartTotal().toFixed(2)}
              </Text>
            </HStack>

            <Button
              colorPalette="green"
              size="lg"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </Button>

            <NextLink href="/products">
              <Button variant="outline" colorPalette="green" size="lg">
                Continue Shopping
              </Button>
            </NextLink>
          </VStack>
        </Box>
      </VStack>
    </Container>
    <Footer />
    </>
  );
}
