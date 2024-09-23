"use client"
import useProjectId from "@/hooks/useProjectId";
import Documents from "./components/documents/documents";
import FinancialInfo from "./components/financialInfo/financialInfo";
import Header from "./components/header/header";
import Tab from "./components/tab/tab";
import styles from "./project.module.scss";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { project } = useProjectId(Number(id))
  return (
    <div className={styles.projectPageContainer}>
      <Header name={project.name} country={project.country} />
      <div className={styles.body}>
        <div className={styles.screenDivision}>
          <div className={styles.leftHandSide}>
            <Tab {...project} />
          </div>
          <div className={styles.financialInfo}>
            <FinancialInfo
              projectId={parseInt(id)}
              currentAmount={project.amountCollected}
              goalAmount={project.amountNeed}
              minAmount={project.minAmount}
                country={project.country}
                seed={project.seeds[0]}
                area={project.area}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
