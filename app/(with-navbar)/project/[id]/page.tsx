"use client";
import Button from "@/components/button/button";
import { Loader } from "@/components/loader/loader";
import TextField from "@/components/textField/textField";
import useLending from "@/hooks/useLending";
import mockUSDT from "@/contracts/MockUSDT.json";
import lending from "@/contracts/lendingTest.json";
import { FormEventHandler } from "react";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { investInLending, loading } = useLending();

  const handleInvest: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // @ts-ignore
    const amount = parseInt(event.target.amount.value);
    await investInLending(amount.toString(), mockUSDT, lending);
    // @ts-ignore  typescript is not recognizing the reset method
    event.target.reset();
  };
  return (
    <main>
      <h1>Project {id}</h1>
      <form onSubmit={handleInvest}>
        <TextField type="number" placeholder="amount" name="amount" />
        <Button size={"md"} variant={"primary"} disabled={loading}>
          {!loading ? "Invertir" : <Loader />}
        </Button>
      </form>
    </main>
  );
}
