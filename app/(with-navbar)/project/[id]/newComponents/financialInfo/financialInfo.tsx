"use client";
import styles from "./financialInfo.module.scss";
import ProgressBar from "@/components/progressBar/progressBar";
import Button from "@/components/button/button";
import useLending from "@/hooks/useLending";
import { FormEventHandler } from "react";
import mockUSDT from "@/contracts/mockUSDT.json";
import lending from "@/contracts/lendingTest.json";
import TextIndexComponent from "@/app/(with-navbar)/project/[id]/newComponents/TextIndexComponent/textIndexComponent";
import TextField from "@/components/textField/textField";
import { getLocationById, investByProjectId } from "@/api";

type FinancialInfoProps = {
  projectId: number;
  currentAmmount: number;
  goalAmmount: number;
  minAmmount: number;
  seeds: string[];
  addressId: number;
  tamaño?: number;
  ROI?: number;
};

export default async function FinancialInfo({
                                              projectId,
                                              currentAmmount,
                                              goalAmmount,
                                              minAmmount,
                                              seeds,
                                              addressId,
                                              tamaño = 25, // example value
                                              ROI = 11.2, // example value
                                            }: FinancialInfoProps) {

  const {investInLending, loading} = useLending();
  const percentage = Math.floor((currentAmmount / goalAmmount) * 100);

  const handleInvest: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const amount = parseInt((event.target as any).amount.value);
    await investByProjectId(projectId, amount);
    await investInLending(amount.toString(), mockUSDT, lending);
    (event.target as any).reset();
  };

  const formattedSeeds = seeds.map((seed, index) =>
      index === 0 ? seed.charAt(0).toUpperCase() + seed.slice(1) : seed
  );

  const address = await getLocationById(addressId);

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
              <span>{formattedSeeds}</span>
            </li>
            <li>
              <span>Ubicación</span>
              <span>{address.country}</span>
            </li>
            <li>
              <span>Tamaño</span>
              <span>{tamaño} Ha</span>
            </li>
            <li>
              <span>Roi estimado *</span>
              <span>{ROI}%</span>
            </li>
          </ul>
          <form className={styles.form} onSubmit={handleInvest}>
            <TextField
                placeholder="Monto a invertir"
                name="amount"
                type="number"
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
