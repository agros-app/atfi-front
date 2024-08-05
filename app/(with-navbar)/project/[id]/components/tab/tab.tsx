"use client";
import { useState } from "react";
import styles from './tab.module.scss';
import Map from "../map/map";
import Shedule from "../schedule/schedule";

type Tabs = "resumen" | "cronograma" | "ubicacion";
const tabs:Tabs[] = ["resumen", "cronograma", "ubicacion"];   

export default function Tab() {
    const [activeTab, setActiveTab] = useState<Tabs>('resumen');

    const content: Record<Tabs, JSX.Element> = {
        'resumen':(<div className={styles.body}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
                        <p>Vulputate mi sit amet mauris commodo quis imperdiet. Elementum nibh tellus molestie nunc non blandit massa enim nec. Ut etiam sit amet nisl purus in. Nunc id cursus metus aliquam eleifend. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nisl</p>
                        <h3 className={styles.bold}>Ver más</h3>
                    </div>),
        "cronograma": <div className={styles.body}><div className={styles.schedule}><Shedule /></div></div>,
        "ubicacion": <div className={styles.body}><Map/></div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                {tabs.map(tab => (
                    <div key={tab} className={tab === activeTab ? styles.selectedTitle : styles.unselectedTitle} onClick={() => setActiveTab(tab)}>
                        {tab}
                    </div>
                ))}
            </div>
            {content[activeTab]}
        </div>
    );
}