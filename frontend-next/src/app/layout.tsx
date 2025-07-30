import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import TopNav from "@/components/Navbar/TopNav";
import SecondaryNav from "@/components/Navbar/SecondaryNav";
import Footer from "@/components/Footer";
import { Toast } from "@/components/toast";

// use metadata for SEO
export const metadata: Metadata = {
  title: "MyShop",
  description: "Built by Tarbi",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport={
  themeColor: "#ffffff", // optional for mobile browsers
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Providers>
            <TopNav />
            <SecondaryNav />
            {children}
            <Footer />
          <Toast/>
          </Providers>
        </div>
      </body>
    </html>
  );
}
