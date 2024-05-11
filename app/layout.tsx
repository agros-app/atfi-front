import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.scss";
import React from "react";
import {Web3ContextProvider} from "@/context/web3Modal";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATFI",
  description: "The eassiest way to invest your money in agro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Web3ContextProvider>
          {children}
        </Web3ContextProvider>
      </body>
    </html>
  );
}
