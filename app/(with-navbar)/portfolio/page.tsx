'use client'
import Link from 'next/link'
import styles from './portfolio.module.scss'
import Redirect from '@/assets/icons/redirect'
import ReactECharts, { type EChartsOption } from 'echarts-for-react'
import { title } from 'process'
import Soy from '@/assets/icons/soy'
import Wheat from '@/assets/icons/wheat'
import Corn from '@/assets/icons/corn'
import Sunflower from '@/assets/icons/sunflower'
import { useEffect, useState } from 'react'
import { getAgrotokenPricing } from '@/app/api/prices/prices'
import { useUserInvestments } from '@/hooks/useInvestment'
import useProjectId from '@/hooks/useProjectId'
import Stock from './components/stock/Stock'
import Button from '@/components/button/button'
import Select from '@/components/select/Select'

interface Price {
  icon: any
  title: string
  price: number
  variation: number
}

export default function Investments() {
  const [prices, setPrices] = useState<Price[]>([])
  const [visibleProjects, setVisibleProjects] = useState(3)
  const { investments } = useUserInvestments()
  const [unit, setUnit] = useState('U$DT')

  const unitOptions = [
    { value: 'U$DT', title: 'U$DT' },
    { value: 'ha', title: 'Hectáreas' }
  ]

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value)
  }

  const totalInvestment = investments?.reduce(
    (acc, invest) => acc + invest.amount,
    0
  )

  useEffect(() => {
    getAgrotokenPricing().then((data) => {
      setPrices(parseResponse(data))
    })
  }, [])

  const parseResponse = (data: any) => {
    const icons: any = {
      SOYA: Soy,
      CORA: Corn,
      WHEA: Wheat
    }

    const translations: { [key: string]: string } = {
      SOYA: 'Soja',
      CORA: 'Maíz',
      WHEA: 'Trigo'
    }

    const usdToArs = data.find(
      (item: any) => item.name === 'USD' && item.referenceCurrency === 'ARS'
    ).price

    return data
      .filter((item: any) => icons[item.name])
      .map((item: any) => ({
        icon: icons[item.name],
        title: translations[item.name] || item.name,
        variation: item.priceVariation,
        price: parseFloat((item.price / usdToArs).toFixed(2))
      }))
  }

  const handleShowMore = () => {
    setVisibleProjects((prev) => prev + visibleProjects)
  }

  return (
    <main className={styles.main}>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Balance</h3>
          <p className={styles.cost}>U$DT {totalInvestment}</p>
          <p className={styles.description}>
            Importe que actualmente se encuentra invertido en uno o mas
            proyectos
          </p>
        </div>
      </div>
      <div style={{ marginTop: 36 }}>
        <h3>Cotizaciones</h3>
        <div className={styles.stocksContainer} style={{ marginTop: 16 }}>
          {prices.length > 0 &&
            prices.map((quote) => <Stock key={quote.title} {...quote} />)}
        </div>
      </div>

      <div style={{ marginTop: 36 }}>
        <h3>Inversiones</h3>
        <div className={styles.investmentsContainer}>
          <div>
            {investments?.slice(0, visibleProjects).map((investment) => (
              <div key={investment.projectId} className={styles.investment}>
                <h3>{investment.projectName}</h3>
                <p>${investment.amount}</p>
                <p>{investment.area}ha</p>
                <p>{new Date(investment.createdAt).toLocaleDateString()}</p>
                <Link href={`/project/${investment.projectId}`}>
                  <Button size="sm" variant="outlined" fill>
                    Ver proyecto
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {visibleProjects < (investments?.length || 0) && (
          <p className={styles.viewMore} onClick={handleShowMore}>
            View More
          </p>
        )}
        <div className={styles.chartsContainer}>
          <div className={styles.select}>
            <Select
              placeholder="Unidad de inversión"
              label='Unidad de inversión'
              name="unit"
              options={unitOptions}
              selected={unit}
              onChange={handleUnitChange}
            />
          </div>
          <div className={styles.chart}>
            <PieChart
              data={
                investments?.map((i) => {
                  return {
                    value: unit === 'U$DT' ? i.amount : i.area,
                    name: i.projectName
                  }
                }) ?? []
              }
              title={`Invertido en ${unit}`}
              unit={unit}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

const PieChart = ({
  data,
  title,
  unit
}: {
  data: { value: number; name: string }[]
  title?: string
  unit: string
}) => {
  const options: EChartsOption = {
    title: {
      text: title ?? '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 0
    },
    color: ['#1c5739', '#C8E6C9', '#2d7a51', '#A5D6A7', '#0f3d28'],
    series: [
      {
        name: `Invertido (${unit})`,
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  const isMobile = window.innerWidth < 768
  return (
    <ReactECharts option={options} style={{ width: isMobile ? '100%' : 600 }} />
  )
}
