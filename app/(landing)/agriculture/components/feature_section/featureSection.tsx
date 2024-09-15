import React from 'react';
import styles from './featureSection.module.scss';
const FeaturesSection = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Sumate a la nueva dimensión de los agronegocios</h2>
            <p className={styles.description}>
                Conectamos la tradición del agro con la innovación digital para agilizar la liquidez de tu producción y crear las soluciones de pago y financiación que necesitas para cada momento de tu ciclo productivo.
                Con nosotros podés transformar tus granos de soja, maíz o trigo en agrotokens, disponibles en una billetera virtual para una mejor gestión de tu negocio.
            </p>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <img src="/agriculture/growth_icon.png" alt="Liquidez inmediata" className={styles.icon} />
                    <h3>Financiación</h3>
                    <p>Accedé a financiación inmediata con tus granos y optimizá tu capital de trabajo.</p>
                </div>
                <div className={styles.card}>
                    <img src="/agriculture/transparency_icon.png" alt="Operaciones simples" className={styles.icon} />
                    <h3>Eficiencia</h3>
                    <p>Realizá tus operaciones de forma simple, rapida y segura, con total transparencia.</p>
                </div>
                <div className={styles.card}>
                    <img src="/agriculture/secure_icon.png" alt="Más formas de usar tus granos" className={styles.icon} />
                    <h3>Seguridad</h3>
                    <p>Asegurá el proceso de tu campaña y accedé a más formas de uso de tus productos.</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
