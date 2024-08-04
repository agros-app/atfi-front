
import Documents from "./components/documents/documents";
import FinancialInfo from "./components/financialInfo/financialInfo";
import Header from "./components/header/header";
import Producer from "./components/producer/producer";
import Tab from "./components/tab/tab";
import styles from "./project.module.scss";
import { getProjectById } from "@/lib/api";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const project = await getProjectById(Number(id));

  return (
    <div className={styles.projectPageContainer}>
      <Header name={project.name} />
      <div className={styles.body}>
        <div className={styles.screenDivision}>
          <div className={styles.leftHandSide}>
            <Tab/>
          </div>
            <div className={styles.financialInfo}>
              <FinancialInfo
                projectId={parseInt(id)}
                currentAmmount={project.amountCollected}
                goalAmmount={project.amountNeed}
                minAmmount={project.minAmount}
              />
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
