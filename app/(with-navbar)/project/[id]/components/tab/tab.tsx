"use client";
import { useState } from "react";
import styles from './tab.module.scss';
import Map from "../map/map";
import Shedule from "../schedule/schedule";
import { DetailsTab } from "@/app/(with-navbar)/project/[id]/components/detailsTab/detailsTab";
import Documents from "@/app/(with-navbar)/project/[id]/components/documents/documents";
import Producer from "@/app/(with-navbar)/project/[id]/components/producer/producer";
import Stepper from "@/components/stepper/stepper";
import {ProjectDetailInfo} from "@/types/api";
import Comercializador from "@/app/(with-navbar)/project/[id]/components/comercializador/comercializador";
type Tabs = "resumen" | "ubicacion" | "productor" | "comercializador" | "detalles" | "progreso";
const tabs: Tabs[] = ["resumen", "productor","comercializador", "ubicacion", "detalles", "progreso"];

// Hardcoded steps for now, until we have the data from SIMA
const steps = [
    { title: 'Siembra de maíz', description: 'Se sembraron 10 hectáreas de maíz.', date: '01/03/2024' },
    { title: 'Aplicación de fertilizantes', description: 'Se aplicaron 200 kg de fertilizante NPK.', date: '15/03/2024' },
    { title: 'Riego', description: 'Primera irrigación realizada para asegurar el crecimiento de las plantas.', date: '20/03/2024' },
    { title: 'Cosecha', description: 'Recolección del maíz.', date: '01/07/2024' },
];

export default function Tab(data:ProjectDetailInfo) {
    const [activeTab, setActiveTab] = useState<Tabs>('resumen');
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };


    const content: Record<Tabs, JSX.Element> = {
        'resumen': (
            <div className={styles.body}>
                <p>{showFullText ? data.description : truncateText(data.description, 100)}</p>
                <h3 className={styles.bold} onClick={toggleShowFullText}>
                    {showFullText ? "Ver menos" : "Ver más"}
                </h3>
                <div className={styles.componentContainer}>
                    <Documents/>
                </div>
                <div className={styles.body}>
                    <div className={styles.schedule}><Shedule {...data}/></div>
                </div>
            </div>
        ),
        "productor": <div className={styles.body}><Producer {...data}/></div>,
        "comercializador": <div className={styles.body}><Comercializador /></div>,
        "ubicacion": <div className={styles.body}><Map {...data} /></div>,
        "detalles": <div className={styles.body}><DetailsTab /></div>,
        "progreso": <div className={styles.body}><Stepper steps={steps}/></div>

    };

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                {tabs.map(tab => (
                    <div
                        key={tab}
                        className={tab === activeTab ? styles.selectedTitle : styles.unselectedTitle}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </div>
                ))}
            </div>
            {content[activeTab]}
        </div>

    );
}
