'use client'
import useProjectId from '@/hooks/useProjectId'
import FinancialInfo from './components/financialInfo/financialInfo'
import Header from './components/header/header'
import Tab from './components/tab/tab'
import styles from './project.module.scss'
import React from 'react'
import Loader from '@/components/loader/Loader'
import useSession from '@/hooks/useSession'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { project, isLoading: isProjectLoading } = useProjectId(Number(id))
  const { userData: user } = useSession()
  const isLoading = isProjectLoading
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.projectPageContainer}>
      <Header
        id={project.id}
        name={project.name}
        country={project.country}
        photoURL={project.photoURL}
        isProducer={project.producerEmail == user?.email}
      />
      <div className={styles.body}>
        <div className={styles.screenDivision}>
          <div className={styles.leftHandSide}>
            <Tab data={project} />
          </div>
          <div className={styles.financialInfo}>
            <FinancialInfo
              projectId={parseInt(id)}
              isProducer={project.producerEmail == user?.email}
              campaignEnded={new Date(project.endFarming) < new Date()}
              currentAmount={project.amountCollected}
              goalAmount={project.amountNeed}
              minAmount={0}
              country={project.country}
              seed={project.providers[0]?.seed ?? 'soja'}
              area={project.area}
              contractAdress={project.contractAdress!!}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
