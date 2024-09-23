import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/styles/globals.scss";
import { getSession } from "@/lib/session";
import SessionProvider from "@/context/sessionContext";
import { Web3ContextProvider } from "@/context/web3Modal";
import { Toaster } from "react-hot-toast";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"]
});
//Set to a default value
export const metadata: Metadata = {
  title: "AGRAS",
  description: "The easiest way to invest your money in agro",
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
      <html lang="en">
      <body className={lato.className}>
      <SessionProvider session={session}>
        <Web3ContextProvider>
          {children}
          <Toaster position="bottom-right"/>
        </Web3ContextProvider>
      </SessionProvider>
      </body>
      </html>
  );
}
