"use client";
import styles from "./financialInfo.module.scss";
import ProgressBar from "@/components/progressBar/progressBar";
import Button from "@/components/button/button";
import TextIndexComponent from "../TextIndexComponent/textIndexComponent";
import TextField from "@/components/textField/textField";
import useLending from "@/hooks/useLending";
import { FormEventHandler } from "react";
import mockUSDT from "@/contracts/mockUSDT.json";
import lending from "@/contracts/lendingTest.json";
import { investByProjectId } from "@/lib/api";

type FinancialInfoProps = {
  projectId: number;
  currentAmount: number;
  goalAmount: number;
  minAmount: number;
  country: string
  seed: string
  area: number
};


export default function FinancialInfo({
  projectId,
  currentAmount,
  goalAmount,
  minAmount,
    country,
    seed,
    area
}: FinancialInfoProps) {
  const { investInLending, loading } = useLending();
  const percentage = Math.floor((currentAmount / goalAmount) * 100);

  const handleInvest: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // @ts-ignore
    const amount = parseInt(event.target.amount.value);
    await investByProjectId(projectId, amount);
    await investInLending(amount.toString(), mockUSDT, lending);
    // @ts-ignore  typescript is not recognizing the reset method
    event.target.reset();
  };

  function capitalizeFirstLetter(string?: string) {
    if (!string) return ""; // Maneja casos donde string sea undefined o null
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <h3 className={styles.title}>Total Recaudado</h3>
        <div className={styles.amount}>
          <TextIndexComponent
            text={`$${currentAmount} USD`}
            percentage={`${percentage}`}
            subtext={`Meta: $${goalAmount} USD`}
          />
          <div className={styles.progressBar}>
            <ProgressBar
              collected={currentAmount}
              goal={goalAmount}
              height={15}
            />
          </div>
        </div>
        <ul className={styles.leaders}>
          <li>
            {/*Only shows the principal seed*/}
            <span>Tipo de cosecha</span>
            <span>{capitalizeFirstLetter(seed)}</span>
          </li>
          <li>
            <span>Ubicación</span>
            <span>{capitalizeFirstLetter(country)}</span>
          </li>
          <li>
            <span>Tamaño</span>
            <span>{`${area} Ha`}</span>
          </li>

          {/*<li>*/}
          {/*  <span>Roi estimado *</span>*/}
          {/*  <span>11,2%</span>*/}
          {/*</li>*/}
        </ul>
        <form className={styles.form} onSubmit={handleInvest}>
          <TextField
            placeholder="Monto a invertir"
            name="amount"
            type="number"
            // @ts-ignore
            min={minAmount}
          />
          <small>*Minimo de inversión: ${minAmount}</small>
          <Button fill disabled={loading}>
            Invertir
          </Button>
        </form>
      </div>
    </div>
  );
}