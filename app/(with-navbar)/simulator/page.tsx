'use client'

import { SimulationData } from '@/types/api'
import { useState } from 'react'
import CropSimulationForm from './components/form/Form'
import projectBackgroundImage from '@assets/images/project/project_background.webp'

import styles from './page.module.scss'
import SimulationPanel from './components/simulation/SimulationPanel'
import Image from 'next/image'

export default function SimulatorPage() {
  const [simulation, setSimulation] = useState<SimulationData[]>([])

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.textContainer}>
          <p className={styles.title}>Simulador</p>
          <p className={styles.subtitle}>
            Calcula la rentabilidad estimada de tus cultivos según el tipo de
            siembra, zona, rendimiento esperado e inversión, ayudándote a tomar
            decisiones informadas para maximizar tus ganancias.
          </p>
        </div>
        <Image
          className={styles.image}
          src={projectBackgroundImage.src}
          width={projectBackgroundImage.width}
          height={projectBackgroundImage.height}
          alt="Farm Image"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.formSide}>
          <CropSimulationForm onSubmit={(data) => setSimulation(data)} />
          <small>
            Todas estas simulaciones estan basadas en camapañas pasadas
          </small>
        </div>
        <div className={styles.simulationSide}>
          {simulation ? (
            <SimulationPanel data={simulation} />
          ) : (
            <h4>Carga los datos y simula tu inversión</h4>
          )}
        </div>
      </div>
    </div>
  )
}
