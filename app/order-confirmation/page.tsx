"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function OrderConfirmationContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") || "N/A";
  const router = useRouter();

  return (
    <>
      <Header />
      <Container maxW="container.md" py={10}>
        <VStack gap={6} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" color="green.600" mb={2}>
              Order Confirmed
            </Heading>
            <Text color="gray.600">
              Thank you! Your order number is {orderNumber}.
            </Text>
          </Box>

          <Box p={6} borderWidth="1px" borderRadius="lg">
            <VStack gap={3} align="stretch">
              <Text>
                We’ve emailed your confirmation. You can continue shopping or
                view products below.
              </Text>
              <HStack gap={3}>
                <Button colorPalette="green" onClick={() => router.push("/products")}> 
                  Browse Products
                </Button>
                <Button variant="outline" onClick={() => router.push("/")}> 
                  Go Home
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<Container maxW="container.md" py={10}><Text>Loading...</Text></Container>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}