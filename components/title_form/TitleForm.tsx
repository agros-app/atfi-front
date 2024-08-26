import styles from './TitleForm.module.scss'

type TitleFormProps = {
    text: string;
}


export default function TitleForm({text}: TitleFormProps) {
    return (
        <div className={styles.title}>
            <div className={styles.text}>{text}</div>
            <div className={styles.vector}></div>
        </div>
    )
}