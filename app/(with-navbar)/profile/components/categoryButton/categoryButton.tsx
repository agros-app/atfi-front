import styles from './categoryButton.module.scss';

type CategoryButtonProps = {
    name: string;
    imagePath: string
    isSelected: boolean
    onClick: () => void
}

export default function CategoryButton({
                                           name,
                                           imagePath,
                                           isSelected,
                                           onClick
                                       }: CategoryButtonProps){
    return(
        <div className={styles.container} onClick={onClick}>
            <div className={isSelected ? styles.selectedContainer : styles.unselectedContainer}>
                <img className={styles.icon} src={imagePath} alt={"Download Icon"} />
                <p className={styles.text}>{name}</p>
            </div>
        </div>
    )
}