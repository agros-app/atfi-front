import styles from './title.module.scss';

type TitleProps = {
    children: React.ReactNode;
    filled?: boolean;
    hover?: boolean;
}

export default function Title(
    {
        children,
        filled = false,
        hover = false
    }: TitleProps) {
    const classNames = `${styles.dataType} ${filled ? styles.filledDataType : ''} ${hover ? styles.hoverEnabled : ''}`;

    return (
        <div>
            <p className={classNames}>{children}</p>
        </div>
    )
}
