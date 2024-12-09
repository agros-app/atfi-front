'use client'
import {useEffect, useState} from 'react'
import styles from './tab.module.scss'
import Map from '../map/map'
import Shedule from '../schedule/schedule'
import { DetailsTab } from '@/app/(with-navbar)/project/[id]/components/detailsTab/detailsTab'
import Documents from '@/app/(with-navbar)/project/[id]/components/documents/documents'
import Stepper, { ProgressStep } from '@/components/stepper/stepper'
import { ProjectDetailInfo, ProjectMessage, ProjectYieldata, UserInvestment } from '@/types/api'
import Comercializador from '@/app/(with-navbar)/project/[id]/components/comercializador/comercializador'
import useProjectYieldata from '@/hooks/useProjectYieldata'
import CommentThread from '../commentThread/CommentThread'
import ProductorTab from '../productor_tab/productorTab'
import useProjectId from "@/hooks/useProjectId";
import { createProjectProgress, getProjectProgress, getUserInvestments } from '@/lib/api'
type Tabs =
  | 'resumen'
  | 'ubicacion'
  | 'productor'
  | 'comercializador'
  | 'detalles'
  | 'progreso'
  | 'inversiones'
  | 'retornos'
const tabs: Tabs[] = [
  'resumen',
  'productor',
  'comercializador',
  'ubicacion',
  'detalles',
  'progreso',
  'inversiones',
  'retornos'
]

// Hardcoded steps for now, until we have the data from SIMA
// const steps = [
//   {
//     title: 'Siembra de maíz',
//     description: 'Se sembraron 10 hectáreas de maíz.',
//     date: '01/03/2024'
//   },
//   {
//     title: 'Aplicación de fertilizantes',
//     description: 'Se aplicaron 200 kg de fertilizante NPK.',
//     date: '15/03/2024'
//   },
//   {
//     title: 'Riego',
//     description:
//       'Primera irrigación realizada para asegurar el crecimiento de las plantas.',
//     date: '20/03/2024'
//   },
//   { title: 'Cosecha', description: 'Recolección del maíz.', date: '01/07/2024' }
// ]

export default function Tab({ data, isProducer }: { data: ProjectDetailInfo, isProducer: boolean }) {
  const [activeTab, setActiveTab] = useState<Tabs>('resumen')
  const [showFullText, setShowFullText] = useState(false)
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [investments, setInvestments] = useState<UserInvestment[]>([]);
  const [returns, setReturns] = useState<UserInvestment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStep, setNewStep] = useState<Partial<ProgressStep>>({});
  
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const projectSteps = await getProjectProgress(data.id);
        setSteps(projectSteps);
      } catch (error) {
        console.error('Error fetching project progress:', error);
      }
    };
    fetchSteps();
  }, [data.id]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const totalInvestments = await getUserInvestments()

        const investments = totalInvestments.filter(investment => investment.projectId === data.id && investment.status === 'APPROVED')
        console.log(investments.length)
        setInvestments(investments)

        const returns = totalInvestments.filter(investment => investment.projectId === data.id && investment.status === 'RETURNS_INJECTED')
        setReturns(returns)

      } catch (error) {
        console.error('Error fetching project investments for user:', error);
      }
    };
    fetchInvestments()
  }, [data.id])

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStep((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateStep = async () => {
    if (!newStep.title || !newStep.description || !newStep.date) return; 

    try {
      await createProjectProgress(newStep.title!, newStep.description!, data.id, new Date(newStep.date!));
      setSteps((prev) => [...prev, newStep as ProgressStep]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating project progress:', error);
    }
  };
  
  const nameToSnakeCase = (name: string) => {
    return name.replace(/\s+/g, '_').toLowerCase()
  }


  const snakeCaseName = data?.name ? nameToSnakeCase(data.name) : ''
  const { yieldata } = useProjectYieldata('El_Milagro') || { yieldata: {} }
  // const { yieldata } = useProjectYieldata(String(snakeCaseName)) || { yieldata: {} };

  const toggleShowFullText = () => {
    setShowFullText(!showFullText)
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ')
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text
  }

  const content: Record<Tabs, JSX.Element> = {
    resumen: (
      <div className={styles.body}>
        <p>
          {showFullText
            ? data.description
            : truncateText(data.description, 100)}
        </p>
        <h3 className={styles.bold} onClick={toggleShowFullText}>
          {showFullText ? 'Ver menos' : 'Ver más'}
        </h3>
        <div className={styles.componentContainer}>
          <Documents />
        </div>
        <div>
          <div className={styles.schedule}>
            <Shedule {...data} />
          </div>
        </div>
      </div>
    ),
    productor: (
      <div className={styles.body}>
        <ProductorTab data={data} />
      </div>
    ),
    comercializador: (
      <div className={styles.body}>
        <Comercializador data={data} />
      </div>
    ),
    ubicacion: (
      <div className={styles.body}>
        <Map {...data} />
      </div>
    ),
    detalles: (
      <div className={styles.body}>
        <DetailsTab yieldata={yieldata} project={data}/>
      </div>
    ),
    progreso: (
      <div className={styles.body}>
        <Stepper steps={steps} />
      </div>
    ),
    inversiones: (
      <div className={styles.investmentsContainer}>
      {!isProducer && investments.length > 0 ? (
        <>
          <div className={styles.investmentHeader}>
            <p>Cantidad</p>
            <p>Porcentaje</p>
            <p>Fecha</p>
          </div>

        {investments.map((investment) => (
        <div key={investment.projectId} className={styles.investmentRow}>
          <p>${investment.amount}</p>
          <p>{(investment.amount*100)/data.amountNeed}%</p>
          <p>{new Date(investment.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
      </>
    ) : (
      <p>Por el momento no hay inversiones para este proyecto.</p>
    )}
    </div>
  ),
  retornos: (
    <div className={styles.investmentsContainer}>
    {!isProducer && returns.length > 0 ? (
      <>
        <div className={styles.investmentHeader}>
          <p>Cantidad</p>
          <p>Porcentaje</p>
          <p>Fecha</p>
        </div>

      {returns.map((investment) => (
      <div key={investment.projectId} className={styles.investmentRow}>
        <p>${investment.amount}</p>
        <p>{(investment.amount*100)/data.amountNeed}%</p>
        <p>{new Date(investment.createdAt).toLocaleDateString()}</p>
      </div>
    ))}
    </>
  ) : (
    <p>Por el momento no hay retornos para este proyecto.</p>
  )}
  </div>
),
}

let filteredTabs = tabs
if(isProducer) filteredTabs = tabs.filter(tab => tab !== 'inversiones' && tab !== 'retornos') 
else if (new Date(data.endFarming) < new Date()) filteredTabs = tabs.filter(tab => tab !== 'progreso')

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        {filteredTabs.map((tab) => (
          <div
            key={tab}
            className={
              tab === activeTab ? styles.selectedTitle : styles.unselectedTitle
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>
      {content[activeTab]}
      {activeTab === 'progreso' && (
  <div>
    {isProducer && (
      <>
        <button onClick={handleOpenModal} className={styles.addButton}>
          Crear Nuevo Progreso
        </button>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Crear Nuevo Progreso</h2>
              <label>
                Título:
                <input
                  type="text"
                  name="title"
                  onChange={handleInputChange}
                  value={newStep.title || ''}
                />
              </label>
              <label>
                Descripción:
                <input
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  value={newStep.description || ''}
                />
              </label>
              <label>
                Día:
                <input
                  type="date"
                  name="date"
                  onChange={handleInputChange}
                  value={newStep.date || ''}
                />
              </label>
              <div className={styles.modalActions}>
                <button
                  onClick={handleCreateStep}
                  className={styles.saveButton}
                >
                  Guardar
                </button>
                <button
                  onClick={handleCloseModal}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )}
  </div>
)}
  </div>
  )
}
