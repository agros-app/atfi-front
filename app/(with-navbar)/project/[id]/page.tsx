"use client";
import FarmImage from "./newComponents/farmImage/farmImage";
import FinancialInfo from "./newComponents/financialInfo/financialInfo";
import styles from "./project.module.scss";
import TabComponent from "./newComponents/tabComponent/tabComponent";
import Documents from "./newComponents/documents/documents";
import Producer from "./newComponents/producer/producer";
import { getProjectById } from "@/api";
import { differenceInCalendarDays, startOfToday } from "date-fns";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const {
    addressId,
    amountCollected,
    amountNeed,
    description,
    endDate,
    minAmount,
    name,
    seeds,
    startDate,
    status,
  } = await getProjectById(parseInt(id));


  const days = differenceInCalendarDays(new Date(endDate), startOfToday());
  return (
    <div className={styles.projectPageContainer}>
      <FarmImage name={name} addressId={addressId} />
      <div className={styles.body}>
        <div className={styles.screenDivision}>
          <div className={styles.leftHandSide}>
            <TabComponent sowingDate={endDate} investementEndDate={startDate} location={addressId} description={description} />
          </div>
          <div className={styles.rightHandSide}>
            <div className={styles.financialInfo}>
              <FinancialInfo
                projectId={parseInt(id)}
                currentAmmount={amountCollected}
                goalAmmount={amountNeed}
                minAmmount={minAmount}
                seeds={seeds}
                addressId={addressId}
              />
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
