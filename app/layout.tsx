import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import Header from "./components/header/Header";
import { Toaster } from 'react-hot-toast';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareHub",
  description:
    "Our clinic delivers comprehensive medical services through a team of experienced specialists, using modern medical technologies to ensure accurate diagnosis and effective treatment. We are committed to providing high-quality care in a safe and comfortable environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased my-0 min-h-screen flex justify-center items-center `}
      >
        <ReactQueryProvider>
          <div className="hero-bg" />
          <Header />
          <main className="z-10  w-full"> {children}</main>
           <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
