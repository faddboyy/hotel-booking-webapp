import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Methods",
  description: "View all supported payment methods and secure transaction options.",
};

export default function PaymentMethodsPage() {
  return (
    <div className="max-w-screen-xl mx-auto py-20 px-4 mt-8">
      <h1 className="text-4xl font-semibold mb-6">Payment Methods</h1>
      <p className="text-gray-700 leading-relaxed">
        We provide several convenient and secure payment options to ensure a smooth booking experience for all guests.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Available Methods</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-3">
        <li>Credit & Debit Cards</li>
        <li>Bank Transfer</li>
        <li>Virtual Account (VA)</li>
        <li>E-Wallets</li>
        <li>On-site Cash or Card Payment</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Payment Security</h2>
      <p className="text-gray-700 leading-relaxed">
        All transactions are encrypted and processed through trusted and verified payment gateways to ensure safety and privacy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Refund Policy</h2>
      <p className="text-gray-700 leading-relaxed">
        Refunds are subject to our cancellation policy. Please contact our support team for refund-related inquiries.
      </p>
    </div>
  );
}
