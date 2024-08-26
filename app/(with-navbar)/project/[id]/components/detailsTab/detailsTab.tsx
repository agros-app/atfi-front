'use client'
import React from 'react'
import styles from './detailsTab.module.scss'
import ReactECharts from 'echarts-for-react'
// import Stepper from '@/components/stepper/stepper'

const CostEvolutionChart = () => {
  const options = {
    title: {
      text: 'Evolución del costo a lo largo del tiempo'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto'
      ]
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [
      {
        name: 'Costo',
        type: 'line',
        data: [1200, 1500, 1800, 1100, 1600, 2000, 1700, 1900],
        smooth: true,
        lineStyle: {
          color: '#5470C6'
        },
        itemStyle: {
          color: '#5470C6'
        }
      }
    ]
  }

  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  )
}

const FarmingCostPieChart = () => {
  const options = {
    title: {
      text: 'Costos de producción',
      subtext: 'Agrupados por tipo',
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
    series: [
      {
        name: 'Tipo de Costo',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 4000, name: 'Semillas' },
          { value: 3000, name: 'Fertilizantes' },
          { value: 2000, name: 'Mano de Obra' },
          { value: 1500, name: 'Pesticidas' },
          { value: 1000, name: 'Agua' }
        ],
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
  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  )
}

const ComparativeCostBarChart = () => {
  const options = {
    title: {
      text: 'Comparación de Costos Agrícolas por Categoría'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4'],
      bottom: 0,
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['Semillas', 'Fertilizantes', 'Mano de Obra', 'Pesticidas', 'Agua']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Trimestre 1',
        type: 'bar',
        data: [500, 700, 1000, 600, 400]
      },
      {
        name: 'Trimestre 2',
        type: 'bar',
        data: [600, 800, 1200, 700, 500]
      },
      {
        name: 'Trimestre 3',
        type: 'bar',
        data: [700, 850, 1300, 750, 550]
      },
      {
        name: 'Trimestre 4',
        type: 'bar',
        data: [750, 900, 1400, 800, 600]
      }
    ]
  }

  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  )
}

const RadarChart = () => {
  const options = {
    title: {
      text: 'Comparación de Parcelas en Función de Diferentes Métricas'
    },
    tooltip: {},
    legend: {
      data: ['Parcela A', 'Parcela B'],
      bottom: 0,
      left: 'center'
    },
    radar: {
      indicator: [
        { name: 'Rendimiento', max: 100 },
        { name: 'Consumo de Agua', max: 100 },
        { name: 'Uso de Fertilizantes', max: 100 },
        { name: 'Resistencia a Plagas', max: 100 },
        { name: 'Calidad del Suelo', max: 100 }
      ],
      shape: 'circle',
      splitNumber: 5
    },
    series: [
      {
        name: 'Comparación de Parcelas',
        type: 'radar',
        data: [
          {
            value: [80, 70, 60, 90, 85],
            name: 'Parcela A'
          },
          {
            value: [75, 65, 80, 85, 70],
            name: 'Parcela B'
          }
        ]
      }
    ]
  }

  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  )
}

const ComboChart = () => {
  const options = {
    title: {
      text: 'Lluvias y Producción Agrícola'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
    },
    yAxis: [
      {
        type: 'value',
        name: 'Lluvias (mm)'
      },
      {
        type: 'value',
        name: 'Producción (Toneladas)'
      }
    ],
    series: [
      {
        name: 'Lluvias',
        type: 'bar',
        data: [50, 60, 70, 80, 90, 100]
      },
      {
        name: 'Producción',
        type: 'line',
        yAxisIndex: 1,
        data: [200, 400, 600, 800, 1000, 1200]
      }
    ]
  }

  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  )
}

const HeatmapChart = () => {
  const data = [
    [0, 0, 5],
    [0, 1, 10],
    [0, 2, 15],
    [1, 0, 20],
    [1, 1, 25],
    [1, 2, 30],
    [2, 0, 35],
    [2, 1, 40],
    [2, 2, 45]
  ]

  const options = {
    title: {
      text: 'Distribución de Productividad por Zona'
    },
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['Zona 1', 'Zona 2', 'Zona 3']
    },
    yAxis: {
      type: 'category',
      data: ['Sección A', 'Sección B', 'Sección C']
    },
    visualMap: {
      min: 0,
      max: 50,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [
      {
        name: 'Productividad',
        type: 'heatmap',
        data: data,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  )
}

export function DetailsTab() {
  return (
    <div>
      <p className={styles.title}>
        En esta sección se presentan distintos gráficos que muestran información
        relevante sobre el progreso de la campaña agricola. Los datos
        presentados son extraidos de la plataforma de monitoreo y control de la
        campaña.
      </p>
      <div className={styles.graphContainer}>
        <FarmingCostPieChart />
        <ComparativeCostBarChart />
      </div>
      <div className={styles.graphContainer}>
        <CostEvolutionChart />
      </div>
    </div>
  )
}
