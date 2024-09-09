import styles from "./comercializador.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import nicoImage from "@assets/images/owners/nico.webp";

export default function Comercializador() {

    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                Vulputate mi sit amet mauris commodo quis imperdiet. Elementum nibh tellus molestie nunc non blandit
                massa enim nec. Ut etiam sit amet nisl purus in. Nunc id cursus metus aliquam eleifend. Praesent
                elementum facilisis leo vel fringilla est ullamcorper eget nulla.`;


    return (
        <div className={styles.container}>
            <div className={styles.title}>Comercializador</div>
            <div className={styles.profile}>
                <ProfileImage src={nicoImage.src} size={60}/>
                <div className={styles.name}>Pepito Valverde</div>
            </div>
            <p>{fullText}</p>
        </div>
    )

}