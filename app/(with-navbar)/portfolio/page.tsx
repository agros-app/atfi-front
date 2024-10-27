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
import {useEffect, useState} from "react";
import {getAgrotokenPricing} from "@/app/api/prices/prices";
import {useUserInvestments} from "@/hooks/useInvestment";
import useProjectId from "@/hooks/useProjectId";

interface Price {
    icon: any;
    title: string;
    price: number;
}

export default function Investments() {
    const [prices, setPrices] = useState<Price[]>([]);
    const [visibleProjects, setVisibleProjects] = useState(3);
    const { investments } = useUserInvestments();

    useEffect(() => {
        getAgrotokenPricing().then((data) => {
            setPrices(parseResponse(data));
        });
    }, []);

    const parseResponse = (data: any) => {
        const icons: any = {
            'SOYA': Soy,
            'CORA': Corn,
            'WHEA': Wheat,
        };

        const translations: { [key: string]: string } = {
            SOYA: 'Soja',
            CORA: 'Maíz',
            WHEA: 'Trigo',
        };

        const usdToArs = data.find((item: any) => item.name === 'USD' && item.referenceCurrency === 'ARS').price;

        return data
            .filter((item: any) => icons[item.name])
            .map((item: any) => ({
                icon: icons[item.name],
                title: translations[item.name] || item.name,
                price: parseFloat((item.price / usdToArs).toFixed(2))
            }));
    };

    const handleShowMore = () => {
        setVisibleProjects((prev) => prev + visibleProjects);
    };

    return (
        <main className={styles.main}>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <h3>Balance</h3>
                    <p className={styles.cost}>U$DT 100.000</p>
                    <p className={styles.description}>Importe que actualmente se encuentra invertido en uno o mas proyectos</p>
                </div>
                <div className={styles.card}>
                    <h3>Ganancia histórica</h3>
                    <p className={styles.cost}>U$DT 20.000</p>
                    <p className={styles.description}>Importe histórico de las ganancias obtenidas en la plataforma</p>
                </div>
            </div>

            <div style={{ marginTop: 36 }}>
                <h3>Cotizaciones</h3>
                <div className={styles.stocksContainer} style={{ marginTop: 16 }}>
                    {prices.length > 0 && prices.map(quote => (
                        <div key={quote.title} className={styles.stocksCard}>
                            <div>
                                <quote.icon />
                                <h4>{quote.title}</h4>
                            </div>
                            <p className={styles.cost}>${quote.price}/t</p>
                        </div>
                    ))}
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
                                    <Redirect />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {visibleProjects < (investments?.length || 0) && (
                    <p className={styles.viewMore} onClick={handleShowMore}>View More</p>
                )}
                <div className={styles.chartsContainer}>
                    <div>
                        <PieChart
                            data={investments?.map(i => ({ value: i.amount, name: i.projectName })) || []}
                            title="Invertido en U$DT"
                        />
                    </div>
                    <div>
                        <PieChart
                            data={investments?.map(i => ({ value: i.area, name: i.projectName })) || []}
                            title="Invertido en hectáreas"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

const PieChart = ({ data, title }: { data: { value: number, name: string }[], title?: string }) => {
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
            '#1c5739',
            '#C8E6C9',
            '#2d7a51',
            '#A5D6A7',
            '#0f3d28',
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
    return <ReactECharts option={options} style={{ width: isMobile ? "100%" : 600 }} />;
};