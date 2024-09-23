import React from 'react';
import styles from './featureSection.module.scss';
const FeaturesSection = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Sumate a la transformación de los agronegocios</h2>
            <p className={styles.description}>
                Conectate con inversores interesados en potenciar tu campaña agropecuaria, accediendo al financiamiento necesario para llevarla a cabo. Diversificá riesgos, aumentá tu capacidad productiva y hacé crecer tu negocio.
            </p>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <img src="/agriculture/growth_icon.png" alt="Liquidez inmediata" className={styles.icon} />
                    <h3>Financiación</h3>
                    <p>Accedé al capital necesario para impulsar tu campaña agropecuaria o ampliar la producción en más hectáreas.</p>
                </div>
                <div className={styles.card}>
                    <img src="/agriculture/transparency_icon.png" alt="Operaciones simples" className={styles.icon} />
                    <h3>Eficiencia</h3>
                    <p>Conectá fácilmente con inversores a través de nuestra plataforma y recibí el financiamiento directamente en tu cuenta bancaria.</p>
                </div>
                <div className={styles.card}>
                    <img src="/agriculture/secure_icon.png" alt="Más formas de usar tus granos" className={styles.icon} />
                    <h3>Seguridad</h3>
                    <p>Protegé tus fondos y asegurá el flujo de dinero con la tecnología y respaldo de nuestro socio estratégico, Ripio.</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
