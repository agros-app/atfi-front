import styles from './financialInfo.module.scss';
import TextIndexComponent from "@/app/(with-navbar)/project/components/TextIndexComponent/textIndexComponent";
import ProgressBar from "@/components/progressBar/progressBar";
import Button from "@/components/button/button";
import Title from "@/app/(with-navbar)/project/components/title/title";

export default function FinancialInfo() {
  return (
    <div className={styles.container}>
        <div className={styles.data}>
            <Title filled>Total Recaudado</Title>
            <div className={styles.amount}>
                    <TextIndexComponent text="500.000 USD" percentage="71,42" subtext="Meta: 1.000.000 USD"/>
                    <div className={styles.progressBar}>
                        <ProgressBar collected={500000} goal={1000000} />
                    </div>
            </div>
            <Title>ROI Estimado *</Title>
            <div className={styles.amount}>
                <TextIndexComponent text={"13,67%"} />
            </div>
        </div>
        <div className={styles.button}>
            <Button variant={"secondary"} size={"lg"} fill>Invertir</Button>
        </div>
    </div>
  );
}