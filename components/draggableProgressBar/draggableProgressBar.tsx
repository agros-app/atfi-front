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

    const handleDrag = (event: MouseEvent) => {
        const progressBar = document.querySelector(`.${styles.progressBarOutside}`) as HTMLElement;
        if (progressBar) {
            const newWidth = event.clientX - progressBar.getBoundingClientRect().left;
            const newPercentage = (newWidth / progressBar.clientWidth) * 100;
            if (newPercentage >= 0 && newPercentage <= 100) {
                setPercentage(newPercentage);
                onPercentageChange(newPercentage); // Actualiza el porcentaje en el componente principal
            }
        }
    };

    const startDrag = (event: React.MouseEvent) => {
        event.preventDefault(); // Previene la selección de texto
        setIsDragging(true);
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", stopDrag);
        } else {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", stopDrag);
        }

        return () => {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", stopDrag);
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
                />
            </div>
        </div>
    );
}
