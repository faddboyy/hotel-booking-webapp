// Perkiraan path: components/room/PaymentButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Asumsi Anda memiliki tipe 'reservationProps' seperti di API route Anda
// Jika tidak, Anda bisa menggunakan 'any' atau membuat tipe baru
import { reservationProps } from "@/types/reservation";

// Deklarasi tipe 'snap' pada 'window' agar TypeScript tidak error
declare global {
  interface Window {
    snap: any;
  }
}

const PaymentButton = ({ reservation }: { reservation: reservationProps }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // 1. Panggil API route Anda untuk mendapatkan token
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (!res.ok) {
        throw new Error("Failed to create payment token");
      }

      const { token } = await res.json();

      if (!token) {
        throw new Error("Invalid payment token received");
      }

      console.log("window.snap:", window.snap);
      console.log("token:", token);

      // 2. Gunakan token untuk memicu Midtrans Snap popup
      window.snap.pay(token);
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("An error occurred while processing payment. Please try again.");
    } finally {
      // Pastikan loading state kembali false
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full mt-5 px-4 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {isLoading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default PaymentButton;
