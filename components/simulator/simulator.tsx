import React, { useEffect, useState } from "react";
import styles from './simulator.module.scss';
import TextField from "@/components/textField/textField";
import DraggableProgressBar from "@/components/draggableProgressBar/draggableProgressBar";

export default function Simulator() {
    const [investment, setInvestment] = useState<number>(500);
    const [expectedReturn, setExpectedReturn] = useState<number>(10);
    const [hasExpectedReturnChanged, setHasExpectedReturnChanged] = useState<boolean>(false);
    const [hasInvestmentChanged, setHasInvestmentChanged] = useState<boolean>(false);
    const [totalProfit, setTotalProfit] = useState<number>(0);
    const [benefit, setBenefit] = useState<number>(0);

    useEffect(() => {
        const calculatedProfit = investment + (investment * (expectedReturn / 100));
        const calculatedBenefit = calculatedProfit - investment;
        setTotalProfit(calculatedProfit);
        setBenefit(calculatedBenefit);
    }, [investment, expectedReturn]);

    const handleInvestmentChange = (value: string) => {
        const cleanedValue = value.replace(/[^0-9.]/g, '');
        const parsedValue = parseFloat(cleanedValue);
        if (!isNaN(parsedValue)) {
            setInvestment(Math.min(parsedValue, 9999999));
            setHasInvestmentChanged(true);
        }
        if (cleanedValue === "") {
            setInvestment(0);
            setHasInvestmentChanged(false);
        }
    };

    const handleExpectedReturnChange = (value: string) => {
        const cleanedValue = value.replace(/[^0-9.]/g, '');
        const parsedValue = parseFloat(cleanedValue);
        if (!isNaN(parsedValue)) {
            const limitedValue = Math.min(parsedValue, 100);
            setExpectedReturn(limitedValue);
            setHasExpectedReturnChanged(true);
        }
        if (cleanedValue === "") {
            setExpectedReturn(0);
            setHasExpectedReturnChanged(false);
        }
    };

    const handleProgressBarChange = (newPercentage: number) => {
        const roundedPercentage = parseFloat(newPercentage.toFixed(1));
        setExpectedReturn(roundedPercentage);
        setHasExpectedReturnChanged(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.title}>SIMULADOR DE INVERSIÓN</div>
                <div className={styles.innerContainer}>
                    <div className={styles.leftContainer}>
                        <div className={styles.textFields}>
                            <TextField
                                placeholder={`USD ${investment}`}
                                name="Inversión deseada"
                                label="Inversión deseada"
                                value={hasInvestmentChanged ? "USD " + investment : ""}
                                onChange={(e) => handleInvestmentChange(e.target.value)}
                            />
                            <TextField
                                placeholder={`% ${expectedReturn}`}
                                name="Rendimiento esperado"
                                label="Rendimiento esperado"
                                value={hasExpectedReturnChanged ? `% ${expectedReturn}` : ""}
                                onChange={(e) => handleExpectedReturnChange(e.target.value)}
                            />
                        </div>
                        <DraggableProgressBar
                            collected={expectedReturn}
                            goal={100}
                            onPercentageChange={handleProgressBarChange}
                        />
                    </div>
                    <div className={styles.rightContainer}>
                        <div className={styles.profitContainer}>
                            <div className={styles.totalProfit}>
                                <div className={styles.profitTitle}>Retorno</div>
                                <div className={styles.profitValue}>U$D {totalProfit.toFixed(2)}</div>
                            </div>
                            <div className={styles.totalRevenue}>
                                <div className={styles.revenueTitle}>Beneficio</div>
                                <div className={styles.revenueValue}>U$D {benefit.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className={styles.bottomContainer}>
                            Los valores no representan una garantía de rendimiento futuro. Es solamente una estimación tomando en cuenta el rendimiento histórico de la zona.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
