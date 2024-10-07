import styles from "./dottedList.module.scss";

type DottedListProps = {
    amount: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void;  // Add this prop
}

export default function DottedList({ amount, activeIndex, setActiveIndex }: DottedListProps) {
    return (
        <div>
            <div className={styles.container}>
                {Array.from({ length: amount }, (_, index) => (
                    <div
                        key={index}
                        className={index === activeIndex ? styles.filled : styles.stroked}
                        onClick={() => setActiveIndex(index)}  // Set active index on click
                    />
                ))}
            </div>
        </div>
    );
}
