import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.scss";
import { Web3ContextProvider } from "@/context/web3Modal";
import { Toaster } from "react-hot-toast";
import Provider from "@/context/provider";
import { getSession } from "@/lib/auth";

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
  const session = await getSession()
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Provider session={session}>
          <Web3ContextProvider>
            {children}
            <Toaster position="bottom-right" />
          </Web3ContextProvider>
        </Provider>
      </body>
    </html>
  );
}
