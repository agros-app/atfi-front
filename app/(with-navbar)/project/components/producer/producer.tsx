import styles from './producer.module.scss';
import ProfileImage from "@/components/profileImage/profileImage";
import Lollo from "@/assets/Images/lollo.jpeg";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";

export default function Producer(){
    return(
        <div className={styles.container}>
            <div className={styles.title}>Productor</div>
            <div className={styles.profile}>
                <ProfileImage icon={Lollo.src} size={60} />
                <div className={styles.name}>Pepito Valverde</div>
            </div>
            <div className={styles.title}>Envianos un mensaje</div>
            <TextField placeholder={"mensaje"} name={"mensaje"} />
            <Button variant={"tertiary"} fill>Contactar</Button>
        </div>
    )
}