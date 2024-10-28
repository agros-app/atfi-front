import React, { useState, useEffect } from "react";
import styles from "./draggableProgressBar.module.scss";

type ProgressBarProps = {
    collected: number;
    goal: number;
    height?: number;
    onPercentageChange: (percentage: number) => void;
};

export default function DraggableProgressBar({ collected, goal, height, onPercentageChange }: ProgressBarProps) {
    const [percentage, setPercentage] = useState((collected / goal) * 100);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setPercentage((collected / goal) * 100);
    }, [collected, goal]);

    const handleDrag = (event: MouseEvent | TouchEvent) => {
        const progressBar = document.querySelector(`.${styles.progressBarOutside}`) as HTMLElement;
        if (progressBar) {
            const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
            const newWidth = clientX - progressBar.getBoundingClientRect().left;
            let newPercentage = (newWidth / progressBar.clientWidth) * 100;

            // Limitar el porcentaje entre 0 y 100
            newPercentage = Math.max(0, Math.min(newPercentage, 100));

            setPercentage(newPercentage);
            onPercentageChange(newPercentage);
        }
    };


    const startDrag = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", stopDrag);
            document.addEventListener("touchmove", handleDrag);
            document.addEventListener("touchend", stopDrag);
        } else {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchmove", handleDrag);
            document.removeEventListener("touchend", stopDrag);
        }

        return () => {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchmove", handleDrag);
            document.removeEventListener("touchend", stopDrag);
        };
    }, [isDragging]);

    return (
        <div className={styles.progressBarOutside} style={{ height: `${height}px` }}>
            <div
                className={styles.progressBarInside}
                style={{ width: `${percentage}%` }}
            >
                <div
                    className={styles.resizeCircle}
                    onMouseDown={startDrag}
                    onTouchStart={startDrag} // Agregar evento táctil para iniciar el arrastre en dispositivos móviles
                />
            </div>
        </div>
    );
}
