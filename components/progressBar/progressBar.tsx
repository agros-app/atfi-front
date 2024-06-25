import styles from "./progressBar.module.scss";

type ProgressBarProps = {
    collected: number;
    goal: number;
    height?: number; // Optional height prop
};

export default function ProgressBar({ collected, goal, height = 7 }: ProgressBarProps) { // Default height of 7
    const percentage = (collected / goal) * 100;

    return (
        <div className={styles.progressBarOutside} style={{ height: `${height}px` }}>
            <div
                className={styles.progressBarInside}
                style={{ width: `${percentage}%`, height: '100%' }}
            />
        </div>
    );
}
