import styles from "./comercializador.module.scss";
import ProfileImage from "@/components/profileImage/profileImage";
import nicoImage from "@assets/images/owners/nico.webp";
import {ProjectDetailInfo} from "@/types/api";

export default function Comercializador( { data }: { data: ProjectDetailInfo }) {

    const fullText = `Nuestra empresa, ${data.providers[0].name}, se especializa en la comercialización de productos agrícolas, conectando a los productores con mercados locales e internacionales. Contamos con más de 20 años de experiencia en el sector, proporcionando soluciones innovadoras y logísticas eficientes que aseguran que los productos agrícolas lleguen en óptimas condiciones a su destino final. AgroComercial trabaja en estrecha colaboración con agricultores, cooperativas y distribuidores para ofrecer precios competitivos y maximizar los beneficios de nuestros clientes. Nuestra red de distribución cubre las principales zonas productoras del país, garantizando un servicio de calidad en cada etapa del proceso.`;


    return (
        <div className={styles.container}>
            <div className={styles.title}>Comercializador</div>
            <div className={styles.profile}>
                <ProfileImage src={nicoImage.src} size={60}/>
                <div className={styles.name}>{data.providers[0].name}</div>
            </div>
            <p>{fullText}</p>
        </div>
    )

}