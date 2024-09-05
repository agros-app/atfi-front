import styles from './categoryButton.module.scss';

type CategoryButtonProps = {
    name: string;
    imagePath: string;
    isSelected: boolean;
    onClick: () => void;
    iconSize?: string;
}

export default function CategoryButton({
                                           name,
                                           imagePath,
                                           isSelected,
                                           onClick,
                                           iconSize = '30px'
                                       }: CategoryButtonProps){
    return(
        <div className={styles.container} onClick={onClick}>
            <div className={isSelected ? styles.selectedContainer : styles.unselectedContainer}>
                <div className={styles.icon}>
                    <img
                        src={imagePath}
                        alt={"Download Icon"}
                        style={{ height: iconSize, width: "auto" }}
                    />
                </div>
                <p className={styles.text}>{name}</p>
            </div>
        </div>
    )
}
