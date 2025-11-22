import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-screen-xl mx-auto py-20 px-4 mt-8">
      <h1 className="text-4xl font-semibold mb-6">Privacy Policy</h1>
      <p className="text-gray-700 leading-relaxed">
        We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Information We Collect</h2>
      <p className="text-gray-700 leading-relaxed">
        We collect personal information provided during booking, such as your name, email address, phone number, and payment details.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">How We Use Your Data</h2>
      <p className="text-gray-700 leading-relaxed">
        Your data is used solely for reservation processing, customer support, and service improvement. We do not sell or distribute your information to third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Security</h2>
      <p className="text-gray-700 leading-relaxed">
        We implement strict security measures to ensure that your personal data remains protected at all times.
      </p>
    </div>
  );
}
