// src/TabComponent.js

import React, { useState } from 'react';
import styles from './tabComponent.module.scss';
import Map from '../map/map';
import Shedule from "@/app/(with-navbar)/project/[id]/newComponents/shedule/shedule";

export default function TabComponent() {
    const [activeTab, setActiveTab] = useState('resumen');

    function handleTabChange(tab: string) {
        setActiveTab(tab);
    }

    function renderContent() {
        switch (activeTab) {
            case 'resumen':
                return (
                    <div className={styles.body}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
                        <p>Vulputate mi sit amet mauris commodo quis imperdiet. Elementum nibh tellus molestie nunc non blandit massa enim nec. Ut etiam sit amet nisl purus in. Nunc id cursus metus aliquam eleifend. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nisl</p>
                        <h3 className={styles.bold}>Ver más</h3>
                    </div>
                );
            case 'cronograma':
                return <div className={styles.body}><div className={styles.schedule}><Shedule /></div></div>;
            case 'ubicacion':
                return <div className={styles.body}><Map></Map></div>;

            default:
                return null;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <div
                    className={activeTab === 'resumen' ? styles.selectedTitle : styles.unselectedTitle}
                    onClick={() => handleTabChange('resumen')}
                >
                    RESUMEN
                </div>
                <div
                    className={activeTab === 'cronograma' ? styles.selectedTitle : styles.unselectedTitle}
                    onClick={() => handleTabChange('cronograma')}
                >
                    CRONOGRAMA
                </div>
                <div
                    className={activeTab === 'ubicacion' ? styles.selectedTitle : styles.unselectedTitle}
                    onClick={() => handleTabChange('ubicacion')}
                >
                    UBICACIÓN
                </div>
            </div>
            {renderContent()}
        </div>
    );
}
