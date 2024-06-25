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
import { investByProjectId } from "@/api";
import toast from "react-hot-toast";

type FinancialInfoProps = {
  projectId: number;
  currentAmmount: number;
  goalAmmount: number;
  minAmmount: number;
};

export default function FinancialInfo({
  projectId,
  currentAmmount,
  goalAmmount,
  minAmmount,
}: FinancialInfoProps) {
  const { investInLending, loading } = useLending();
  const percentage = Math.floor((currentAmmount / goalAmmount) * 100);

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
            text={`$${currentAmmount}`}
            percentage={`${percentage}`}
            subtext={`Meta: $${goalAmmount}`}
          />
          <div className={styles.progressBar}>
            <ProgressBar collected={currentAmmount} goal={goalAmmount} />
          </div>
        </div>
        <Title>ROI Estimado *</Title>
        <div className={styles.amount}>
          <TextIndexComponent text={"13,67%"} />
        </div>
      </div>
      <form className={styles.form} onSubmit={handleInvest}>
        <TextField
          placeholder="Monto a invertir"
          name="amount"
          type="number"
          // @ts-ignore
          min={minAmmount}
        />
        <small>{`* Minima inversión requerida $${minAmmount}`}</small>
        <Button variant={"secondary"} size={"lg"} fill disabled={loading}>
          Invertir
        </Button>
      </form>
    </div>
  );
}
