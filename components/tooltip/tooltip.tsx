import styles from './tooltip.module.scss';
import React, {useState} from "react";
import TooltipChart from "@/components/tooltip/tooltipChart";

type TooltipProps = {
    text: string;
    side: "right" | "top" | "bottom";
}


export default function Tooltip({text, side}: TooltipProps) {
    const [tooltipChart, setTooltipChart] = useState('none');

    return (
        <div>
            <div style={{display: tooltipChart}}>
                <TooltipChart side={side}>{text}</TooltipChart>
            </div>
            <span className={styles.infoIcon}
                  onMouseEnter={e => {
                      setTooltipChart('block');
                  }}
                  onMouseOut={e => {
                      setTooltipChart('none')
                  }}>
                    ?
                </span>
        </div>
    );

}