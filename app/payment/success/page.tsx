// app/payments/success/page.tsx
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;

  const transactionStatus = params.transaction_status;
  const orderId = params.order_id;

  // 🔁 Handle redirect based on status
  if (!transactionStatus) redirect("/payment/failure");

  if (transactionStatus === "pending") {
    redirect(`/payment/pending?order_id=${orderId}`);
  }

  if (transactionStatus === "failure") {
    redirect(`/payment/failure?order_id=${orderId}`);
  }

  // Jika sukses → tampilkan halaman
  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Done</h1>
      <p className="text-gray-600 mb-8">
        Thank you! Your payment has been successfully processed.
      </p>

      <a
        href="/reservation"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 inline-block"
      >
        Back to Reservation
      </a>
    </div>
  );
};

export default PaymentSuccessPage;
