import LandingCard from '../landingCard/landingCard';
import styles from './howItWorks.module.scss';

// Change icons.
export default function HowItWorks() {
    return (
        <section className={styles.container}>
            <h1 className={styles.howItWorks}>¿Cómo funciona?</h1>
            <div className={styles.cards}>
                <LandingCard title={"Explorá"} description={"En nuestra plataforma encontrarás diversas oportunidades de inversión disponibles."}/>
                <LandingCard title={"Invertí"} description={"Seleccioná la oportunidad de inversión que mejor se adapte a tus objetivos financieros y estrategias de inversión."}/>
                <LandingCard title={"Ganá"} description={"Una vez finalizado el proyecto se te reintegrará el total más los intereses obtenidos."}/>
            </div>
        </section>
    );
}
