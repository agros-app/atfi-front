'use client'
import useProjectId from '@/hooks/useProjectId'
import FinancialInfo from './components/financialInfo/financialInfo'
import Header from './components/header/header'
import Tab from './components/tab/tab'
import styles from './project.module.scss'
import React, {useEffect, useState} from 'react'
import Loader from '@/components/loader/Loader'
import useSession from '@/hooks/useSession'
import {getProjectsByProviderId} from "@/lib/api";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { project, isLoading: isProjectLoading } = useProjectId(Number(id))
  const { userData: user } = useSession()
  const isLoading = isProjectLoading
  if (isLoading) {
    return <Loader />
  }

  const dateDDMMYY = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  return (
    <div className={styles.projectPageContainer}>
      <Header
        id={project.id}
        name={project.name}
        country={project.country}
        photoURL={project.photoURL}
        isProducer={project.producerEmail == user?.email || user?.role?.toUpperCase() === "RIPIO"}
        status={project.status}
      />
      <div className={styles.body}>
        <div className={styles.screenDivision}>
          <div className={styles.leftHandSide}>
            <Tab data={project} isProducer={project.producerEmail == user?.email}/>
          </div>
          <div className={styles.financialInfo}>
            <FinancialInfo
              projectId={parseInt(id)}
              walletDisplayable={user?.walletDisplayable}
              isProducer={project.producerEmail == user?.email || user?.role?.toUpperCase() === "RIPIO"}
              hasProvider={project.providers.length > 0}
              isProvider={project.providers.some(provider => provider.userId === user?.id)}
              campaignEnded={new Date(project.endFarming) < new Date()}
              currentAmount={project.amountCollected}
              returnsDate={dateDDMMYY(project.returnsDate)}
              goalAmount={project.amountNeed}
              minAmount={project.minAmount}
              country={project.country}
              seed={project.providers[0]?.seed ?? 'soja'}
              area={project.area}
              contractAdress={project.contractAdress!!}
              status={project.status}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
