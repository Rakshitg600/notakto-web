import { useState } from 'react';

const [, setIsProcessingPayment] = useState<boolean>(false);

export const handleBuyCoins = async () => {
    setIsProcessingPayment(true);
    try {
      const response = await fetch(`${import.meta.env.PAY_URL}//create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: "1.00",
          currency: "INR",
          customerId: "user_123", // Replace with actual user ID if available
          customerName: "Test User"
        })
      });

      const data = await response.json();
      if (data.success) {
        window.open(data.paymentUrl, '_blank');
        checkPaymentStatus(data.chargeId);
      } else {
        console.log("Payment Failed", "Could not initiate payment. Please try again.");
      }
    } catch (error) {
      console.log("Error", "Payment processing failed");
    } finally {
      setIsProcessingPayment(false);
    }
  };
  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await fetch(`${import.meta.env.PAY_URL}//order-status/${orderId}`);
      const data = await response.json();

      if (data.status === "paid") {
        console.log("Success", "100 coins added to your account!");
        props.onAddCoins?.(100);
      } else {
        setTimeout(() => checkPaymentStatus(orderId), 5000);
      }
    } catch (error) {
      console.log("Error", "Failed to verify payment status");
    }
  };