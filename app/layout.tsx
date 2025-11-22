import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Script from "next/script";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Online Hotel Booking Web Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
         <Script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive" 
        />
      </head>
      <body className={`${raleway.variable} antialiased`}>
        <SessionProvider>
          <Navbar />
          <main className="bg-gray-50 min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
        
      </body>
    </html>
  );
}
