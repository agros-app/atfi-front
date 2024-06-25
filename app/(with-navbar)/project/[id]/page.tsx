"use client";
import FarmImage from "@/app/(with-navbar)/project/[id]/newComponents/farmImage/farmImage";
import FinancialInfo from "@/app/(with-navbar)/project/[id]/newComponents/financialInfo/financialInfo";
import styles from "./project.module.scss";
import TabComponent from "@/app/(with-navbar)/project/[id]/newComponents/tabComponent/tabComponent";
import Documents from "@/app/(with-navbar)/project/[id]/newComponents/documents/documents";
import Producer from "@/app/(with-navbar)/project/[id]/newComponents/producer/producer";

export default function ProjectPage({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div className={styles.projectPageContainer}>
            <FarmImage />
            <div className={styles.body}>
                <div className={styles.screenDivision}>
                    <div className={styles.leftHandSide}>
                        <TabComponent />
                    </div>
                    <div className={styles.rightHandSide}>
                        <div className={styles.financialInfo}>
                            <FinancialInfo />
                        </div>
                    </div>
                </div>
                <div className={styles.componentContainer}>
                    <Documents />
                </div>
                <div className={styles.componentContainer}>
                    <Producer />
                </div>
            </div>
        </div>
    );
}
