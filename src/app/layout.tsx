import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ReduxProvider from "@/redux/Provider";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import ChatbotWidgetLoader from "@/components/chatbot/ChatbotWidgetLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azerbaijan Technical University",
  description: "Azərbaycan Texniki Universiteti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Global Background Elements */}
        <div className="bg-mesh" />
        <div className="bg-grid-premium" />
        
        <ReduxProvider>
          <LanguageProvider>
            <ThemeProvider>
              <HeaderChanger />
              <div className="relative z-10 min-h-screen flex flex-col">
                <div className="flex-1">
                  {children}
                </div>
                <Footer />
              </div>
              <ChatbotWidgetLoader />
            </ThemeProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
