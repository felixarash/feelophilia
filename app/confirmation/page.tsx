'use client';

import { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack,
  HStack,
  Alert
} from '@chakra-ui/react';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  date: string;
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const order = localStorage.getItem('lastOrder');
    if (order) {
      setOrderDetails(JSON.parse(order));
    } else {
      router.push('/');
    }
  }, [router]);

  const downloadInvoice = () => {
    if (!orderDetails) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(72, 187, 120);
    doc.text('Herbal Oasis', 20, 20);
    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Invoice', 20, 35);
    
    // Order Info
    doc.setFontSize(12);
    doc.text(`Order Number: ${orderDetails.orderNumber}`, 20, 50);
    doc.text(`Date: ${new Date(orderDetails.date).toLocaleDateString()}`, 20, 58);
    
    // Customer Info
    doc.setFontSize(14);
    doc.text('Customer Information', 20, 75);
    doc.setFontSize(11);
    doc.text(`Name: ${orderDetails.customer.name}`, 20, 85);
    doc.text(`Email: ${orderDetails.customer.email}`, 20, 92);
    doc.text(`Phone: ${orderDetails.customer.phone}`, 20, 99);
    doc.text(`Address: ${orderDetails.customer.address}`, 20, 106);
    
    // Items
    doc.setFontSize(14);
    doc.text('Order Items', 20, 125);
    doc.setFontSize(11);
    
    let yPos = 135;
    orderDetails.items.forEach((item) => {
      doc.text(`${item.name}`, 20, yPos);
      doc.text(`Qty: ${item.quantity}`, 100, yPos);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 150, yPos);
      yPos += 7;
    });
    
    // Total
    yPos += 10;
    doc.setFontSize(14);
    doc.text(`Total: $${orderDetails.total.toFixed(2)}`, 20, yPos);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for shopping with Herbal Oasis!', 20, yPos + 20);
    doc.text('A copy of this invoice will be sent to admin@herbaloasis.com', 20, yPos + 27);
    
    doc.save(`Invoice-${orderDetails.orderNumber}.pdf`);
  };

  if (!orderDetails) {
    return (
      <>
        <Header />
        <Container maxW="container.xl" py={20}>
          <VStack gap={4}>
            <Text>Loading...</Text>
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
        <Box textAlign="center">
          <FiCheckCircle size={80} color="green" style={{ margin: '0 auto', marginBottom: '1rem' }} />
          <Heading as="h1" size="2xl" color="green.600" mb={2}>
            Order Confirmed!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Thank you for your purchase
          </Text>
        </Box>

        <Alert.Root status="success" borderRadius="lg">
          <HStack align="start" gap={3}>
            <Box>
              <Alert.Title>Order Number: {orderDetails.orderNumber}</Alert.Title>
              <Alert.Description fontSize="sm">
                A confirmation email has been sent to {orderDetails.customer.email}
              </Alert.Description>
            </Box>
          </HStack>
        </Alert.Root>

        {/* Order Summary */}
        <Box p={6} borderWidth="1px" borderRadius="lg">
          <Heading as="h2" size="md" mb={4}>
            Order Summary
          </Heading>
          
          <VStack gap={3} align="stretch">
            {orderDetails.items.map((item) => (
              <HStack key={item.id} justify="space-between">
                <Text>{item.name} × {item.quantity}</Text>
                <Text fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Text>
              </HStack>
            ))}
            
            <Box borderTopWidth="1px" pt={3}>
              <HStack justify="space-between">
                <Text fontSize="xl" fontWeight="bold">Total:</Text>
                <Text fontSize="xl" fontWeight="bold" color="green.600">
                  ${orderDetails.total.toFixed(2)}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </Box>

        {/* Shipping Info */}
        <Box p={6} borderWidth="1px" borderRadius="lg">
          <Heading as="h2" size="md" mb={4}>
            Shipping Information
          </Heading>
          
          <VStack align="stretch" gap={1}>
            <Text>{orderDetails.customer.name}</Text>
            <Text>{orderDetails.customer.email}</Text>
            <Text>{orderDetails.customer.phone}</Text>
            <Text>{orderDetails.customer.address}</Text>
          </VStack>
        </Box>

        <Alert.Root status="info" borderRadius="lg">
          <Alert.Description fontSize="sm">
            A copy of your invoice will be sent to admin@herbaloasis.com
          </Alert.Description>
        </Alert.Root>

        {/* Actions */}
        <VStack gap={3}>
          <Button
            colorPalette="green"
            size="lg"
            w="full"
            onClick={downloadInvoice}
          >
            <HStack gap={2} justify="center">
              <FiDownload />
              <Text>Download Invoice</Text>
            </HStack>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            w="full"
            onClick={() => router.push('/products')}
          >
            Continue Shopping
          </Button>
        </VStack>
      </VStack>
    </Container>
    <Footer />
    </>
  );
}
