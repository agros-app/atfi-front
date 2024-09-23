'use client'
import Link from 'next/link'
import styles from './portfolio.module.scss'
import Redirect from '@/assets/icons/redirect'
import ReactECharts, { type EChartsOption } from 'echarts-for-react';
import { title } from 'process';
import Soy from '@/assets/icons/soy';
import Wheat from '@/assets/icons/wheat';
import Corn from '@/assets/icons/corn';
import Sunflower from '@/assets/icons/sunflower';
import {useState} from "react";

export default function Investments(){

    const [visibleProjects, setVisibleProjects] = useState(3);

    const investments = [
        {
            id: 1,
            title: 'Proyecto 1',
            investedAt: '01/01/2021',
            investedAmount: 10000,
            hectares: 3,
        },
        {
            id: 2,
            title: 'Proyecto 2',
            investedAt: '01/01/2021',
            investedAmount: 20000,
            hectares: 6,
        },
        {
            id: 3,
            title: 'Proyecto 3',
            investedAt: '01/01/2021',
            investedAmount: 50000,
            hectares: 15,
        },
        {
            id: 4,
            title: 'Proyecto 4',
            investedAt: '01/01/2021',
            investedAmount: 2000,
            hectares: 0.6,
        }
    ]

    const quotes = [
        {
            icon: Soy,
            title: 'Soja',
            price: 314.5,
        },
        {
            icon: Wheat,
            title: 'Trigo',
            price: 230.5,
        },
        {
            icon: Corn,
            title: 'Maiz',
            price: 176,
        },
        {
            icon: Sunflower,
            title: 'Girasol',
            price: 310,
        }
    ]

    const handleShowMore = () => {
        setVisibleProjects((prev) => prev + visibleProjects);
    };

    return <main className={styles.main}>
        <div className={styles.cardsContainer}>
            <div className={styles.card}>
                <h3>Balance</h3>
                <p className={styles.cost}>U$DT 100.000</p>
                <p className={styles.description}>Importe que actualmente se encuentra invertido en uno o mas proyectos</p>
            </div>
            <div className={styles.card}>
                <h3>Ganancia historica</h3>
                <p className={styles.cost}>U$DT 20.000</p>
                <p className={styles.description}>Importe historico de las ganancias obtenidas en la plataforma</p>
            </div>
        </div>
        <div style={{marginTop: 36}}>
        <h3>Cotizaciones</h3>
        <div className={styles.stocksContainer} style={{marginTop: 16}}>
            {quotes.map(quote => <div className={styles.stocksCard}>
                <div>
                    <quote.icon/>
                    <h4>{quote.title}</h4>
                </div>
                <p className={styles.cost}>${quote.price}/t</p>
            </div>)}
        </div>
        </div>

        <div style={{marginTop: 36}}>
            <h3>Inversiones</h3>
            <div className={styles.investmentsContainer}>
                <div>
                    {investments.slice(0, visibleProjects).map((investment) => (
                        <div key={investment.id} className={styles.investment}>
                            <h3>{investment.title}</h3>
                            <p>${investment.investedAmount}</p>
                            <p>{investment.hectares}ha</p>
                            <p>{investment.investedAt}</p>
                            <Link href={`/project/${investment.id}`}>
                                <Redirect/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {visibleProjects < investments.length && (
                <p className={styles.viewMore} onClick={handleShowMore}>View More</p>)
            }
            <div className={styles.chartsContainer}>
                <div>
                    <PieChart data={investments.map(i => ({value: i.investedAmount, name: i.title}))}
                              title='Invertido en U$DT'/>
                </div>
                <div>
                    <PieChart data={investments.map(i => ({value: i.hectares, name: i.title}))}
                              title='Invertido en hectareas'/>
                </div>
            </div>
        </div>
    </main>
}


const PieChart = ({data, title}: { data: { value: number, name: string }[], title?: string }) => {
    const options: EChartsOption = {
        title: {
            text: title ?? "",
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
        color: [
            '#1c5739', // Color base
            '#C8E6C9',  // Very Light Green
            '#2d7a51',  // Lighter Green
            '#A5D6A7', // Pale Green
            '#0f3d28', // Mucho más oscuro que #1c5739
        ],
        series: [
            {
                name: 'Tipo de Costo',
                type: 'pie',
                radius: '50%',
                data: data,
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

    const isMobile = window.innerWidth < 768;
    return <ReactECharts option={options} style={{width:isMobile ? "100%" : 600}} />;
};