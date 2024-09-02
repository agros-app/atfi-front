import styles from './producer.module.scss';
import ProfileImage from "@/components/profileImage/profileImage";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import {ProjectDetailInfo} from "@/types/api";

export default function Producer({producerName,producerLastName,producerEmail}:Partial<ProjectDetailInfo>){
    return(
        <div className={styles.container}>
            <div className={styles.title}>Productor</div>
            <div className={styles.profile}>
                <ProfileImage src={"/owners/nico.jpg"} size={60} />
                <div className={styles.name}>{`${producerName} ${producerLastName}`}</div>
            </div>
            <div className={styles.title}>Envianos un mensaje</div>
            <TextField placeholder={"mensaje"} name={"mensaje"} />
            <Button variant={"tertiary"} fill>Contactar</Button>
        </div>
    )
}