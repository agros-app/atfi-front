import Image from "next/image";
import styles from "./hero_image.module.scss";
import FavoriteWallet from "@/app/(landing)/investor/agriculture/components/favourite_wallet/favourite_wallet";
import wheatImage from "@assets/images/investors/agriculture/wheat.webp";


export default function HeroImage(){
    return(
        <div>
            <Image
                alt={"Hero image"}
                className={styles.image}
                src={wheatImage.src}
                width={wheatImage.width}
                height={wheatImage.height}
            />
            <div className={styles.favoriteWallet}>
                <FavoriteWallet />
            </div>
        </div>
    )
}