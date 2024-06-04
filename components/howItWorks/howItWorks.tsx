import styles from './howItWorks.module.scss';
import LandingCard from "@/components/landingCard/landingCard";
import seedling from "@/assets/icons/seedling.png";


// Change icons.
export default function HowItWorks() {
    return (
        <div className={styles.container}>
            <h1 className={styles.howItWorks}>¿Cómo funciona?</h1>
            <div className={styles.cards}>
                <LandingCard icon={seedling.src} title={"Explorá"} description={"En nuestra plataforma encontrarás diversas oportunidades de inversión disponibles."}/>
                <LandingCard icon={seedling.src} title={"Invertí"} description={"Seleccioná la oportunidad de inversión que mejor se adapte a tus objetivos financieros y estrategias de inversión."}/>
                <LandingCard icon={seedling.src} title={"Ganá"} description={"Una vez finalizado el proyecto se te reintegrará el total más los intereses obtenidos."}/>
            </div>
        </div>
    );
}
