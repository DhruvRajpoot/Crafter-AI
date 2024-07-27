import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/index.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/appContext";
import ToastProvider from "@/components/toast-provider";
import { CrispProvider } from "@/components/crisp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crafter AI",
  description:
    "Crafter AI is a Next.js web application that leverages advanced AI technologies to generate text, audio, video, and images. It provides a seamless and interactive experience for users to create diverse content effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <CrispProvider />
          <body className={inter.className}>
            <ToastProvider />
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
