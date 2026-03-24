import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Trident | Secure. Connected. Automated.",
  description:
    "Trident designs, deploys, and operates resilient network infrastructure for the Cayman Islands.",
  icons: {
    icon: "/trident-icon.svg",
    shortcut: "/trident-icon.svg",
    apple: "/trident-icon.svg",
  },
  openGraph: {
    title: "Trident",
    description: "Cayman Islands resilient network infrastructure.",
    url: "https://trident.ky",
    siteName: "Trident",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
