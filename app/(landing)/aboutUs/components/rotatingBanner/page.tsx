'use client'
import React, { useState, useEffect } from "react";
import Mission from "@/app/(landing)/aboutUs/components/rotatingBanner/mission/mission";
import Vision from "@/app/(landing)/aboutUs/components/rotatingBanner/vision/vision";
import DottedList from "@/app/(landing)/aboutUs/components/rotatingBanner/dottedList/dottedList";
import styles from './page.module.scss';

export default function RotatingBanner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [amount] = useState(2);

    useEffect(() => {
        var current = activeIndex;
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => {
                if (activeIndex !== current) { // if it has been modified in the meantime
                    return activeIndex;
                } else {
                    return prevIndex === amount - 1 ? 0 : prevIndex + 1;
                }
            });
        }, 10000);


        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [amount]);

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.slideWrapper}>
                <div className={`${styles.slide} ${activeIndex === 0 ? styles.active : styles.inactive}`}>
                    <Mission />
                </div>
                <div className={`${styles.slide} ${activeIndex === 1 ? styles.inactive : styles.active}`}>
                    <Vision />
                </div>
            </div>
            <DottedList amount={amount} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />  {/* Pass setActiveIndex */}
        </div>
    );
}
