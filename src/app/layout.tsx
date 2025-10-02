import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { NotificationProvider } from "@/context/NotificationContext";
import NotificationContainer from "@/components/NotificationContainer";
import DesktopLayout from "@/components/DesktopLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store Client",
  description: "Интернет-магазин одежды",
  icons: {
    icon: "/client-store-logo.ico",
    shortcut: "/client-store-logo.ico",
    apple: "/client-store-logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <NotificationProvider>
            <FavoritesProvider>
              <CartProvider>
                <OrdersProvider>
                  <DesktopLayout>
                    {children}
                  </DesktopLayout>
                  <NotificationContainer />
                </OrdersProvider>
              </CartProvider>
            </FavoritesProvider>
          </NotificationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
