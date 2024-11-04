"use client"
import useProjectId from "@/hooks/useProjectId";
import Documents from "./components/documents/documents";
import FinancialInfo from "./components/financialInfo/financialInfo";
import Header from "./components/header/header";
import Tab from "./components/tab/tab";
import styles from "./project.module.scss";
import useProjectYieldata from "@/hooks/useProjectYieldata";
import useUserInfo from '@/hooks/useUserInfo'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { project } = useProjectId(Number(id))
  const { user } = useUserInfo()

  return (
    <div className={styles.projectPageContainer}>
      <Header id={project.id} name={project.name} country={project.country} photoURL={project.photoURL} isProducer={project.producerEmail==user.email}/>
      <div className={styles.body}>
        <div className={styles.screenDivision}>
          <div className={styles.leftHandSide}>
            <Tab data={project}  />
          </div>
          <div className={styles.financialInfo}>
            <FinancialInfo
              projectId={parseInt(id)}
              currentAmount={project.amountCollected}
              goalAmount={project.amountNeed}
              minAmount={project.minAmount}
                country={project.country}
                seed={project.providers[0]?.seed ?? "soja"}
                area={project.area}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
