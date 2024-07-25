import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crafter AI",
  description: "AI powered content creation",
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
          <body className={inter.className}>{children}</body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
