import styles from "./farmImage.module.scss";
import {getLocationById} from "@/api";

type FarmImageProps = {
    name: string;
    addressId: number;
}

export default async function FarmImage({
    name,
    addressId
}: FarmImageProps) {

    const address = await getLocationById(addressId);

    return (
        <div className={styles.header}>
            <img className={styles.image} src={"/project image.png"} alt="Farm Image"/>
            <div className={styles.textInTitle}>
                <p className={styles.title}>{name}</p>
                <p className={styles.subtitle}>{address.country}</p>
            </div>
        </div>
    );
}