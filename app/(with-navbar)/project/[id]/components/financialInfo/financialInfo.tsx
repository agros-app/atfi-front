"use client";
import styles from "./financialInfo.module.scss";
import ProgressBar from "@/components/progressBar/progressBar";
import Button from "@/components/button/button";
import Title from "../title/title";
import TextIndexComponent from "../TextIndexComponent/textIndexComponent";
import TextField from "@/components/textField/textField";
import useLending from "@/hooks/useLending";
import { FormEventHandler } from "react";
import mockUSDT from "@/contracts/mockUSDT.json";
import lending from "@/contracts/lendingTest.json";

export default function FinancialInfo() {
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
    <div className={styles.container}>
      <div className={styles.data}>
        <Title filled>Total Recaudado</Title>
        <div className={styles.amount}>
          <TextIndexComponent
            text="500.000 USD"
            percentage="71,42"
            subtext="Meta: 1.000.000 USD"
          />
          <div className={styles.progressBar}>
            <ProgressBar collected={500000} goal={1000000} />
          </div>
        </div>
        <Title>ROI Estimado *</Title>
        <div className={styles.amount}>
          <TextIndexComponent text={"13,67%"} />
        </div>
      </div>
      <form className={styles.form} onSubmit={handleInvest}>
        <TextField placeholder="Monto a invertir" name="amount" type="number" />
        <Button variant={"secondary"} size={"lg"} fill disabled={loading}>
          Invertir
        </Button>
      </form>
    </div>
  );
}
