'use client'
import { useState } from 'react'
import styles from './tab.module.scss'
import Map from '../map/map'
import Shedule from '../schedule/schedule'
import { DetailsTab } from '@/app/(with-navbar)/project/[id]/components/detailsTab/detailsTab'
import Documents from '@/app/(with-navbar)/project/[id]/components/documents/documents'
import Producer from '@/app/(with-navbar)/project/[id]/components/producer/producer'
import Stepper from '@/components/stepper/stepper'

type Tabs = 'resumen' | 'cronograma' | 'ubicacion' | 'detalles' | 'progreso'
const tabs: Tabs[] = [
  'resumen',
  'cronograma',
  'ubicacion',
  'detalles',
  'progreso'
]

//Hardcoded steps for now, until we have the data from SIMA
const steps = [
  {
    title: 'Siembra de maíz',
    description: 'Se sembraron 10 hectáreas de maíz.',
    date: '01/03/2024'
  },
  {
    title: 'Aplicación de fertilizantes',
    description: 'Se aplicaron 200 kg de fertilizante NPK.',
    date: '15/03/2024'
  },
  {
    title: 'Riego',
    description:
      'Primera irrigación realizada para asegurar el crecimiento de las plantas.',
    date: '20/03/2024'
  },
  { title: 'Cosecha', description: 'Recolección del maíz.', date: '01/07/2024' }
]

export default function Tab() {
  const [activeTab, setActiveTab] = useState<Tabs>('resumen')

  const content: Record<Tabs, JSX.Element> = {
    resumen: (
      <div className={styles.body}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit.
        </p>
        <p>
          Vulputate mi sit amet mauris commodo quis imperdiet. Elementum nibh
          tellus molestie nunc non blandit massa enim nec. Ut etiam sit amet
          nisl purus in. Nunc id cursus metus aliquam eleifend. Praesent
          elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nisl
        </p>
        <h3 className={styles.bold}>Ver más</h3>
        <div className={styles.componentContainer}>
          <Documents />
        </div>
        <div className={styles.componentContainer}>
          <Producer />
        </div>
      </div>
    ),
    cronograma: (
      <div className={styles.body}>
        <div className={styles.schedule}>
          <Shedule />
        </div>
      </div>
    ),
    ubicacion: (
      <div className={styles.body}>
        <Map />
      </div>
    ),
    detalles: (
      <div className={styles.body}>
        <DetailsTab />
      </div>
    ),
    progreso: (
      <div className={styles.body}>
        <Stepper steps={steps} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={
              tab === activeTab ? styles.selectedTitle : styles.unselectedTitle
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      {content[activeTab]}
    </div>
  )
}
