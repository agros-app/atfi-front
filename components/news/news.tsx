import Image, {StaticImageData} from "next/image";
import styles from "./news.module.scss";
import Button from "@/components/button/button";

type NewsProps = {
    imageSrc: StaticImageData;
    newspaper: string;
    title: string;
    description: string;
    onButtonClick: () => void;
};


export default function News( news: NewsProps ) {
    const { imageSrc, newspaper, title, description, onButtonClick } = news;
    return (
        <div className={styles.container}>
            <div className={styles.topSide}>
                <Image src={imageSrc.src} alt={"image"} className={styles.image} width={imageSrc.width} height={imageSrc.height} />
            </div>
            <div className={styles.bottomSide}>
                <div className={styles.newspaper}>
                    <p>{newspaper}</p>
                </div>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
                <div className={styles.buttonContainer}>
                    <Button variant={"custom"} size={"sm"} onClick={onButtonClick}>
                        Leer más
                    </Button>
                </div>
            </div>
        </div>
    );
}
