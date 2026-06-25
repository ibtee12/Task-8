import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Inkwell — Online Book Borrowing Platform",
  description:
    "Explore, filter, and borrow books digitally. A modern library experience built with Next.js, BetterAuth, and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="inkwell"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-base-100 text-base-content">
        <ToastProvider />
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
