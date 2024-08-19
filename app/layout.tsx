import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.scss";
import { getSession } from "@/lib/session";
import SessionProvider from "@/context/sessionContext";

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
  const session = await getSession();
  return (
    <html lang="en">
      <body className={outfit.className}>
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
