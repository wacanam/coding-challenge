import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Toaster } from "sonner";
import Providers from "@/providers/QueryProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Toaster position="top-center" />
        <div className="min-h-screen flex-1 flex flex-col items-center">
          <Navigation />
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <Header />
              {children}
            <Footer/>
          </div>
        </div>
      </body>
    </html>
    </Providers>
  );
}