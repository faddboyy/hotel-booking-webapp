import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the terms and conditions for using our services, reservations, and hotel policies.",
};

export default function TermsPage() {
  return (
    <div className="max-w-screen-xl mx-auto py-20 px-4 mt-8">
      <h1 className="text-4xl font-semibold mb-6">Terms & Conditions</h1>
      <p className="text-gray-700 leading-relaxed">
        By accessing and using our services, you agree to comply with all terms and conditions listed on this page. We reserve the right to update or modify these terms at any time without prior notice.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Use of Service</h2>
      <p className="text-gray-700 leading-relaxed">
        Our facilities and services are provided exclusively for lawful and responsible use. Guests are required to respect hotel policies, staff, and other guests during their stay.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Reservation</h2>
      <p className="text-gray-700 leading-relaxed">
        All reservations must be completed with accurate information. Any misuse or fraudulent activity will result in cancellation without refund.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Liability</h2>
      <p className="text-gray-700 leading-relaxed">
        We are not responsible for any personal belongings lost, damaged, or left unattended within hotel premises.
      </p>
    </div>
  );
}
