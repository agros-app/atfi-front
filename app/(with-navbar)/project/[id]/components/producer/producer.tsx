import styles from './producer.module.scss';
import ProfileImage from "@/components/profileImage/profileImage";
import TextField from "@/components/textField/textField";
import Button from "@/components/button/button";
import {MessageData, ProjectDetailInfo} from "@/types/api";
import {useState} from "react";
import useUserInfo from "@/hooks/useUserInfo";
import toast, {useToaster} from "react-hot-toast";
import {contactWithProducer} from "@/lib/api";

export default function Producer({producerName,producerLastName,producerEmail}:Partial<ProjectDetailInfo>){
    const [message, setMessage] = useState('');
    const {user}= useUserInfo();
    const onSendMessage = async (message: string) =>{
        if (message === ''){
            toast.error('El mensaje no puede estar vacio');
        }
        else{
            const data :MessageData ={
                to: producerEmail!!,
                html:message,
                subject: `Mensaje de ${user.name} ${user.lastName}`
            }
            const response = await contactWithProducer(data);
            if (response.status === 200){
                toast.success('Mensaje enviado correctamente');
                setMessage('')
            }
            else{
                toast.error('Error al enviar el mensaje intentelo mas tarde nuevamente');
                }
        }
    }


    return(
        <div className={styles.container}>
            <div className={styles.title}>Productor</div>
            <div className={styles.profile}>
                <ProfileImage src={"/owners/nico.jpg"} size={60} />
                <div className={styles.name}>{`${producerName} ${producerLastName}`}</div>
            </div>
            <div className={styles.title}>Envianos un mensaje</div>
            <TextField placeholder={"mensaje"} name={"mensaje"} value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button variant={"primary"} fill onClick={()=> onSendMessage(message)}>Contactar</Button>
        </div>
    )
}