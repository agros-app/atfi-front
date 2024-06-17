import styles from './solution.module.scss';
import Button from "@/components/button/button";

type SolutionProps = {
    image?: string;
    title: string;
    description: string;
}

// todo: add images.
export default function Solution(
    {   image,
        title,
        description
    }: SolutionProps) {
    return (
        <div className={styles.container}>
            <div className={styles.image} />
            <div className={styles.data}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.button}>
                <Button  size={"md"} fill>Conocer Más</Button>
            </div>
        </div>
    )
}