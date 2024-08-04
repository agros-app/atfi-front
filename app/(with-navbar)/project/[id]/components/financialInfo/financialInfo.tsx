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
    await investByProjectId(projectId, amount);
    await investInLending(amount.toString(), mockUSDT, lending);
    // @ts-ignore  typescript is not recognizing the reset method
    event.target.reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <h3 className={styles.title}>Total Recaudado</h3>
        <div className={styles.amount}>
          <TextIndexComponent
            text={`$${currentAmmount} USD`}
            percentage={`${percentage}`}
            subtext={`Meta: $${goalAmmount} USD`}
          />
          <div className={styles.progressBar}>
            <ProgressBar
              collected={currentAmmount}
              goal={goalAmmount}
              height={15}
            />
          </div>
        </div>
        <ul className={styles.leaders}>
          <li>
            <span>Tipo de cosecha</span>
            <span>Soja</span>
          </li>
          <li>
            <span>Ubicación</span>
            <span>Argentina</span>
          </li>
          <li>
            <span>Tamaño</span>
            <span>25 Ha</span>
          </li>

          <li>
            <span>Roi estimado *</span>
            <span>11,2%</span>
          </li>
        </ul>
        <form className={styles.form} onSubmit={handleInvest}>
          <TextField
            placeholder="Monto a invertir"
            name="amount"
            type="number"
            // @ts-ignore
            min={minAmmount}
          />
          <small>*Minimo de inversión: ${minAmmount}</small>
          <Button fill disabled={loading}>
            Invertir
          </Button>
        </form>
      </div>
    </div>
  );
}