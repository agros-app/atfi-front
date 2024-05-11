"use client";
import NavBar from "@/components/navbar/navbar";
import WalletConnect from "@/components/walletConnect/WalletConnect";

export default function Home() {
  return (
    <>
      {/* TEMPORARY */}
      <NavBar />
      <main>
        <h1>atfi</h1>
          <WalletConnect />
      </main>
    </>
  );
}
