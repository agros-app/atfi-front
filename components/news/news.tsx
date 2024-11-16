import Image, {StaticImageData} from "next/image";
import styles from "./news.module.scss";
import Button from "@/components/button/button";
import featuresBg from "@assets/images/features_background.webp"
import { useEffect, useState } from 'react';

type NewsProps = {
    id: number;
    imageSrc: StaticImageData;
    newspaper: string;
    title: string;
    description: string;
    onButtonClick: () => void;
};


export default function News( news: NewsProps ) {
    const [projectImage, setProfileImage] = useState(featuresBg.src);

    useEffect(() => {
        if (news && news.imageSrc) {
            setProfileImage(`https://elbucke.s3.us-east-1.amazonaws.com/news/${news.imageSrc}`);
        }
    }, [news]);

    const { imageSrc, newspaper, title, description, onButtonClick } = news;
    return (
        <div className={styles.container}>
            <div className={styles.topSide}>
                <Image src={projectImage} alt={"image"} className={styles.image} width={featuresBg.width} height={featuresBg.height} />
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
