import styles from './tooltip.module.scss';
import React from "react";

type TooltipChartProps = {
    children: React.ReactNode;
    side: "right" | "left" | "top" | "bottom";
}

export default function TooltipChart({ children, side }: TooltipChartProps) {
    return (
        <div className={`${styles.chart} ${styles[side]}`}>
            <p style={{fontSize: "16px", padding: "0", margin: "0"}}>{children}</p>
        </div>
    );
}
