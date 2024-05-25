import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.scss";
//import { getSession } from "@/lib/session";
import SessionProvider from "@/context/sessionContext";
import React from "react";
import {Web3ContextProvider} from "@/context/web3Modal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATFI",
  description: "The eassiest way to invest your money in agro",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const session = await getSession();
  return (
    <html lang="en">
      <body className={outfit.className}>
            <Web3ContextProvider>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Web3ContextProvider>
      </body>
    </html>
  );
}
