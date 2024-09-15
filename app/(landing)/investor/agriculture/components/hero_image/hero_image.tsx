import Image from "next/image";
import styles from "./hero_image.module.scss";
import FavoriteWallet from "@/app/(landing)/investor/agriculture/components/favourite_wallet/favourite_wallet";
import wheatImage from "@assets/images/investors/agriculture/wheat.webp";


export default function HeroImage(){
    return(
        <>
            <div className={styles.image}>
                <Image
                    alt={"Hero image"}
                    src={wheatImage.src}
                    width={wheatImage.width}
                    height={wheatImage.height}
                />
            </div>
            <div className={styles.favoriteWallet}>
                <FavoriteWallet />
            </div>
        </>
    )
}