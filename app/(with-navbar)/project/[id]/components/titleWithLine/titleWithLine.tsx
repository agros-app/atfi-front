import styles from './titleWithLine.module.scss';

type TitleWithLineProps = {
    children: React.ReactNode;
}

export default function TitleWithLine({ children }: TitleWithLineProps) {
    return (
        <div className={styles.container}>
            <h2>{children}</h2>
            <hr />
        </div>
    );
};
