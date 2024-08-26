'use client'
import Link from 'next/link'
import styles from './portfolio.module.scss'
import Redirect from '@/assets/icons/redirect'
import ReactECharts from 'echarts-for-react';

export default function Investments(){
    const investments = [
        {
            id: 1,
            title: 'Proyecto 1',
            investedAt: '01/01/2021',
            investedAmount: 10000,
        },
        {
            id: 2,
            title: 'Proyecto 2',
            investedAt: '01/01/2021',
            investedAmount: 20000,
        },
        {
            id: 3,
            title: 'Proyecto 3',
            investedAt: '01/01/2021',
            investedAmount: 50000,
        },
        {
            id: 4,
            title: 'Proyecto 4',
            investedAt: '01/01/2021',
            investedAmount: 2000,
        }
    ]

    


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
            <h3>Inversiones</h3>
            <div className={styles.investmentsContainer}>
                <div>
                    {
                investments.map(investment => {
                    return <div key={investment.id} className={styles.investment}>
                        <h3>{investment.title}</h3>
                        <p>${investment.investedAmount}</p>
                        <p>{investment.investedAt}</p>
                        <Link href={`/project/${investment.id}`}><Redirect/></Link>
                    </div>
                })
            }
                </div>
            
            <PieChart data={investments.map(i=> ({value:i.investedAmount, name:i.title}))}/>
            </div>
            
        </div>
    </main>
}



const PieChart = ({data}: {data: {value:number, name:string}[]}) => {
    const options = {
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
    return <ReactECharts option={options} style={{width:isMobile ? "100%" : 450}} />;
};