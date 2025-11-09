'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Input,
  VStack,
  HStack,
  Textarea,
  chakra
} from '@chakra-ui/react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate order number
    const orderNumber = `HO-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Store order details
    const orderDetails = {
      orderNumber,
      customer: formData,
      items: cart,
      total: getCartTotal(),
      date: new Date().toISOString()
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    
    // Clear cart
    clearCart();
    
    // Navigate to confirmation
    router.push('/confirmation');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <Container maxW="container.xl" py={20}>
          <VStack gap={6}>
            <Heading>Your Cart is Empty</Heading>
            <Text color="gray.600">Please add items to your cart before checking out.</Text>
            <Button colorPalette="green" onClick={() => router.push('/products')}>
              Shop Products
            </Button>
          </VStack>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
    <Container maxW="container.md" py={10}>
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="2xl">
          Checkout
        </Heading>

        {/* Order Summary */}
        <Box p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
          <Heading as="h2" size="md" mb={4}>
            Order Summary
          </Heading>
          
          <VStack gap={2} align="stretch" mb={4}>
            {cart.map(item => (
              <HStack key={item.id} justify="space-between">
                <Text>{item.name} × {item.quantity}</Text>
                <Text fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Text>
              </HStack>
            ))}
          </VStack>
          
          <Box borderTopWidth="1px" pt={4}>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">Total:</Text>
              <Text fontSize="xl" fontWeight="bold" color="green.600">
                ${getCartTotal().toFixed(2)}
              </Text>
            </HStack>
          </Box>
        </Box>

        {/* Checkout Form */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack gap={6} align="stretch">
            <Heading as="h2" size="md">
              Shipping Information
            </Heading>

            <Box>
              <chakra.label htmlFor="name">
                <Text fontWeight="medium" mb={2}>Full Name</Text>
              </chakra.label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </Box>

            <Box>
              <chakra.label htmlFor="email">
                <Text fontWeight="medium" mb={2}>Email</Text>
              </chakra.label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </Box>

            <Box>
              <chakra.label htmlFor="phone">
                <Text fontWeight="medium" mb={2}>Phone Number</Text>
              </chakra.label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </Box>

            <Box>
              <chakra.label htmlFor="address">
                <Text fontWeight="medium" mb={2}>Shipping Address</Text>
              </chakra.label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, State, ZIP"
                rows={4}
                required
              />
            </Box>

            <VStack gap={3}>
              <Button
                type="submit"
                colorPalette="green"
                size="lg"
                w="full"
              >
                Place Order
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                w="full"
                onClick={() => router.push('/cart')}
              >
                Back to Cart
              </Button>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
    <Footer />
    </>
  );
}
