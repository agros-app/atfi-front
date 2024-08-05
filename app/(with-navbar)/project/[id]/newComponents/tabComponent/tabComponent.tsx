import React, { useState } from 'react';
import styles from './tabComponent.module.scss';
import Map from '../map/map';
import Shedule from "@/app/(with-navbar)/project/[id]/newComponents/shedule/shedule";

type TabComponentProps = {
    description: string,
    investementEndDate: string,
    sowingDate: string,
    harvestDate?: string,
    location: number,
}

export default function TabComponent({
                                         description,
                                         investementEndDate,
                                         sowingDate,
                                         harvestDate,
                                         location
                                     }: TabComponentProps) {
    const [activeTab, setActiveTab] = useState('resumen');
    const [showFullText, setShowFullText] = useState(false);

    function handleTabChange(tab: string) {
        setActiveTab(tab);
    }

    const words = description.split(' ');
    const maxWords = 90;
    const isLongDescription = words.length > maxWords;

    function handleToggleText() {
        setShowFullText(!showFullText);
    }

    const displayedWords = showFullText ? words : words.slice(0, maxWords);
    const displayedText = displayedWords.join(' ');
    const descriptionLines = displayedText.split('\n');

    function renderContent() {
        switch (activeTab) {
            case 'resumen':
                return (
                    <div className={styles.body}>
                        {descriptionLines.map((line, index) => (
                            <React.Fragment key={index}>
                                <p>{line}{!showFullText && words.length > maxWords && index === descriptionLines.length - 1 ? '...' : ''}</p>
                                {index < descriptionLines.length - 1 && <p />} {/* Línea en blanco entre párrafos, excepto el último */}
                            </React.Fragment>
                        ))}
                    </div>
                );
            case 'cronograma':
                return (
                    <div className={styles.body}>
                        <div className={styles.schedule}>
                            <Shedule investementEndDate={investementEndDate} harvestDate={sowingDate} />
                        </div>
                    </div>
                );
            case 'ubicacion':
                return (
                    <div className={styles.body}>
                        <Map addressId={location} />
                    </div>
                );
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
            {isLongDescription && activeTab === 'resumen' && (
                <h3 className={styles.bold} onClick={handleToggleText}>
                    {showFullText ? 'Ver menos' : 'Ver más'}
                </h3>
            )}
        </div>
    );
}