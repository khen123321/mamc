import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import { hospital } from "@/constants/hospital";
import "./globals.css";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["italic"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: `${hospital.name} | where Compassion meets Excellence`,
  description: `Patient information, services, doctors, directions, and contact details for ${hospital.name}.`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
