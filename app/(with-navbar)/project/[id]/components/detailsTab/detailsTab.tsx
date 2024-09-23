"use client";
import React, {useState} from 'react';
import styles from './detailsTab.module.scss';
import ReactECharts from 'echarts-for-react';
import Header from "@/app/(with-navbar)/project/[id]/components/header/header";
import {ProjectYieldata} from "@/types/api";
import Tooltip from "@/components/tooltip/tooltip";
import TitleWithLine from "@/app/(with-navbar)/project/[id]/components/titleWithLine/titleWithLine";


const CostEvolutionChart = () => {
    const options = {
        title: {
            text: 'Evolución del costo en el tiempo',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            name: 'Mes',
            data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '${value}',
            },
        },
        series: [
            {
                name: 'Costo',
                type: 'line',
                data: [1200, 1500, 1800, 1100, 1600, 2000, 1700, 1900],
                smooth: true,
                lineStyle: {
                    color: '#5470C6',
                },
                itemStyle: {
                    color: '#5470C6',
                },
            },
        ],
    };

    return <ReactECharts option={options} style={{ height: 400, width: '100%' }} />;
};


const CommodityEvolutionGraph = () => {
    // Should allow a maximum of 5 commodities. Else, it would become quite unreadable.
    const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];

    const options = {
        tooltip: {
            trigger: 'axis',
        },
        legend:{
            data: ['Trigo', 'Soja'],
            bottom: 0,
        },
        xAxis: {
            type: 'category',
            data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
        },
        yAxis: {
            type: 'value',
            name: 'Precio (USD/t)',
            axisLabel: {
                formatter: '${value}',
            },
        },
        series: [
            {
                name: 'Trigo',
                type: 'line',
                data: [1200, 1500, 1800, 1100, 1600, 2000, 1700, 1900],
                lineStyle: {
                    color: '#5470C6',
                },
                itemStyle: {
                    display: "none",
                },
            },
            {
                name: 'Soja',
                type: 'line',
                data: [1000, 1200, 1100, 1600, 1600, 2100, 1900, 1800],
                lineStyle: {
                    color: 'green',
                },
                itemStyle: {
                    display: "none",
                },
            },
        ],

    };

    return (
        <div style={{width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 className={styles.chartTitle}>
                    Evolución del precio del grano</h2>
                <Tooltip
                    side={"right"}
                    text={"Precio de los commodities a lo largo del último año: valor por tonelada de los granos producidos en este campo."}
                />
            </div>

            <ReactECharts option={options} style={{height: 400, width: '100%'}}/>
        </div>)
};


const PerformanceEvolutionGraph = () => {
    // Should allow a maximum of 5 commodities. Else, it would become quite unreadable.
    const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];

    const options = {
        tooltip: {
            trigger: 'axis',
        },
        legend:{
            data: ['Proyección'],
            bottom: 0,
        },
        xAxis: {
            type: 'category',
            data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
        },
        yAxis: {
            type: 'value',
            name: 'Total (USD)',
            axisLabel: {
                formatter: '${value}',
            },
        },
        series: [
            {
                name: 'Proyección',
                type: 'line',
                data: [120000, 150000, 180000, 110000, 160000, 200000, 170000, 190000],
                lineStyle: {
                    color: '#5470C6',
                },
                itemStyle: {
                    display: "none",
                },
            },
        ],

    };

    return (
        <div style={{width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 className={styles.chartTitle}>
                    Producción proyectada en el tiempo
                </h2>
                <Tooltip
                    side={"right"}
                    text={"El valor total proyectado de la cosecha. Se mide: (quintales/ha) x (precio del comodity) x (cantidad de ha)"}
                />
            </div>

            <ReactECharts option={options} style={{height: 400, width: '100%'}}/>
        </div>)
};

const FarmingCostPieChart = () => {
    const options = {
        title: {
            text: 'Costos de producción',
            subtext: 'Agrupados por tipo',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
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
                    { value: 1000, name: 'Agua' },
                ],
                color: [
                    '#0f3d28', // Mucho más oscuro que #1c5739
            '#1c5739', // Color base
            '#2d7a51',  // Lighter Green
                    '#A5D6A7', // Pale Green
                    '#C8E6C9'  // Very Light Green
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
    return <ReactECharts option={options} style={{ height: 400, width: '100%' }} />;
};

const ComparativeCostBarChart = () => {
    const options = {
        title: {
            text: 'Costos Agrícolas por Categoría',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4'],
            bottom: 0,
            left: 'center',
        },
        xAxis: {
            type: 'category',
            data: ['Semillas', 'Fertilizantes', 'Mano de Obra', 'Pesticidas', 'Agua'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Trimestre 1',
                type: 'bar',
                data: [500, 700, 1000, 600, 400],
            },
            {
                name: 'Trimestre 2',
                type: 'bar',
                data: [600, 800, 1200, 700, 500],
            },
            {
                name: 'Trimestre 3',
                type: 'bar',
                data: [700, 850, 1300, 750, 550],
            },
            {
                name: 'Trimestre 4',
                type: 'bar',
                data: [750, 900, 1400, 800, 600],
            },
        ],
        color: [
            '#0f3d28', // Mucho más oscuro que #1c5739
    '#1c5739', // Color base
    '#2d7a51',  // Lighter Green
            '#A5D6A7', // Pale Green
            '#C8E6C9'  // Very Light Green
        ],
    };

    return <ReactECharts option={options} style={{ height: 400, width: '100%' }} />;
};

const RadarChart = () => {
    const options = {
        title: {
            text: 'Comparación de Parcelas en Función de Diferentes Métricas',
        },
        tooltip: {},
        legend: {
            data: ['Parcela A', 'Parcela B'],
            bottom: 0,
            left: 'center',
        },
        radar: {
            indicator: [
                { name: 'Rendimiento', max: 100 },
                { name: 'Consumo de Agua', max: 100 },
                { name: 'Uso de Fertilizantes', max: 100 },
                { name: 'Resistencia a Plagas', max: 100 },
                { name: 'Calidad del Suelo', max: 100 },
            ],
            shape: 'circle',
            splitNumber: 5,
        },
        series: [
            {
                name: 'Comparación de Parcelas',
                type: 'radar',
                data: [
                    {
                        value: [80, 70, 60, 90, 85],
                        name: 'Parcela A',
                    },
                    {
                        value: [75, 65, 80, 85, 70],
                        name: 'Parcela B',
                    },
                ],
            },
        ],
    };

    return <ReactECharts option={options} style={{ height: 400, width: '100%' }} />;
};

interface ComboChartProps {
    data: number[]; // Definimos el tipo de la prop "data"
    median: number;
}
const ComboChart = ({ data, median }: ComboChartProps) => {

    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        legend: {
            show: false,
        },
        xAxis: {
            type: 'category',
            name: 'Percentil (%)',
            data: ['10', '25', '75', '90'],
        },
        yAxis: [
            {
                type: 'value',
                name: 'Rendimiento (kg/ha)',
            },
        ],
        series: [
            {
                name: 'Evolución del rendimiento',
                type: 'line',
                data: data,
            },
            {
                name: 'Rendimiento',
                type: 'bar',
                data: data,
            },
            {
                name: 'Mediana',
                type: 'line',
                data: new Array(data.length).fill(median),
                color: 'gray',
                lineStyle: {
                    opacity: 0,
                    color: 'gray',
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'Mediana' },
                    ],
                },
            },
        ],
    };

    return (
        <div style={{width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 className={styles.chartTitle}>
                    Rendimiento histórico (kg/ha)
                </h2>
                <Tooltip
                    side={"right"}
                    text={"El rendimiento histórico muestra la producción promedio en kilogramos por hectárea a lo largo del tiempo."}
                />
            </div>

            <ReactECharts option={options} style={{height: 400, width: '100%'}}/>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
                <p className={styles.chartText}>Mediana</p>
                <Tooltip
                    side={"right"}
                    text={`La mediana es el valor central entre todas las muestras.`}
                />
            </div>
        </div>
    );
};


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
        [2, 2, 45],
    ];

    const options = {
        title: {
            text: 'Distribución de Productividad por Zona',
        },
        tooltip: {
            position: 'top',
        },
        grid: {
            height: '50%',
            top: '10%',
        },
        xAxis: {
            type: 'category',
            data: ['Zona 1', 'Zona 2', 'Zona 3'],
        },
        yAxis: {
            type: 'category',
            data: ['Sección A', 'Sección B', 'Sección C'],
        },
        visualMap: {
            min: 0,
            max: 50,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
        },
        series: [
            {
                name: 'Productividad',
                type: 'heatmap',
                data: data,
                label: {
                    show: true,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return <ReactECharts option={options} style={{ height: 400, width: '100%' }} />;
};


export function DetailsTab({ yieldata }: { yieldata: ProjectYieldata }) {

    const data = [yieldata.perc10, yieldata.perc25, yieldata.perc75, yieldata.perc90];
    return (
        <div>
            <p className={styles.title}>
                En esta sección se presentan distintos gráficos que muestran información relevante sobre el progreso de
                la campaña agricola.
                Los datos presentados son extraidos de la plataforma de monitoreo y control de la campaña.
            </p>
            <TitleWithLine>Monitoreo Económico</TitleWithLine>
            <div className={styles.graphContainer}>
                <FarmingCostPieChart/>
                <ComparativeCostBarChart/>
            </div>
            <div className={styles.graphContainer}>
                <CommodityEvolutionGraph/>
            </div>
            <div className={styles.graphContainer}>
                <PerformanceEvolutionGraph/>
            </div>

            <TitleWithLine>Información agrícola</TitleWithLine>
            <div className={styles.graphContainer}>
                <ComboChart data={data} median={yieldata.median}/>
            </div>

        </div>
    );
}
