// Perkiraan path: app/api/payment/route.ts

import { reservationProps } from "@/types/reservation"; // Asumsi path ini benar
import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const reservation: reservationProps = await request.json();

    console.log("=== RESERVATION DATA RECEIVED ===");
    console.log(JSON.stringify(reservation, null, 2));

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    });

    // SIMPLE & SAFE ORDER ID
    const orderId = `ord-${reservation.id}`;
    const amount = reservation.payment?.amount || 0;

    console.log("=== MIDTRANS ORDER INFO ===");
    console.log("Order ID:", orderId);
    console.log("Gross Amount:", amount);

    // Jangan proses pembayaran jika 'amount' 0 atau tidak valid.
    if (amount <= 0) {
      console.error("Invalid payment amount:", amount);
      return new NextResponse("Invalid payment amount", { status: 400 });
    }

    // Parameter Midtrans Anda sudah terlihat benar
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: reservation.user.name,
        email: reservation.user.email,
        phone: reservation.user.phone,
      },
    };

    console.log("=== MIDTRANS PARAMETER CLEAN ===");
    console.log(JSON.stringify(parameter, null, 2));

    const token = await snap.createTransactionToken(parameter);

    console.log("=== SNAP TOKEN GENERATED ===");
    console.log(token);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("=== MIDTRANS ERROR ===");
    console.error(error);
    return new NextResponse("Payment Error", { status: 500 });
  }
};