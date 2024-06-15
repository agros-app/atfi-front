"use client";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import LandingCard from '../landingCard/landingCard';
import styles from './howItWorks.module.scss';

const comoFunciona = [
    {
        title: "Explorá",
        description: "En nuestra plataforma encontrarás diversas oportunidades de inversión disponibles. Cada oportunidad de inversión es cuidadosamente seleccionada y evaluada por nuestro equipo de expertos para garantizar su viabilidad y potencial de retorno. Además, proporcionamos toda la información y herramientas necesarias para que puedas tomar decisiones informadas.",
        icon: "https://cdn-icons-png.flaticon.com/512/1160/1160908.png",
        image: "/landing/bg_image.png",
        reverse: false,
    },
    {
        title: "Invertí",
        description: "Seleccioná la oportunidad de inversión que mejor se adapte a tus objetivos financieros y estrategias de inversión. Nuestra plataforma te ofrece una amplia gama de opciones cuidadosamente seleccionadas para ayudarte a maximizar tus rendimientos. Con una interfaz intuitiva y fácil de usar, invertir en el sector agro nunca ha sido tan accesible.",
        icon: "https://cdn-icons-png.flaticon.com/512/1160/1160908.png",
        image: "/landing/bg_image.png",
        reverse: true,
    },
    {
        title: "Ganá",
        description: "Una vez finalizado el proyecto se te reintegrará el total más los intereses obtenidos. Nos enorgullecemos de ofrecer retornos competitivos y transparentes. Desde el momento en que realizas tu inversión, puedes seguir el progreso del proyecto a través de nuestra plataforma, con actualizaciones periódicas y acceso a informes detallados. ",
        icon: "https://cdn-icons-png.flaticon.com/512/1160/1160908.png",
        image: "/landing/bg_image.png",
        reverse: false,
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            staggerChildren: 0.3,
            delay: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.2 } },
};

export default function HowItWorks() {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    return (
        <section className={styles.container} ref={ref}>
            <motion.div
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className={styles.howItWorksContainer}
            >
                <motion.h1
                    variants={itemVariants}
                    className={styles.howItWorks}
                >
                    ¿Cómo funciona?
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className={styles.howItWorksDescription}
                >
                    Descubrí una forma sencilla y efectiva de hacer crecer tus finanzas. Te guiamos
                    a través de cada paso para que puedas invertir con confianza y obtener los mejores resultados.
                </motion.p>
            </motion.div>
            <div className={styles.cards}>
                {
                    comoFunciona.map((item, index) => {
                        const cardControls = useAnimation();
                        const cardRef = useRef(null);
                        const cardInView = useInView(cardRef);

                        useEffect(() => {
                            if (cardInView) {
                                cardControls.start('visible');
                            }
                        }, [cardControls, cardInView]);

                        return (
                            <motion.div
                                key={index}
                                ref={cardRef}
                                initial="hidden"
                                animate={cardControls}
                                variants={itemVariants}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <LandingCard reverse={item.reverse} icon={item.icon} image={item.image} title={item.title} description={item.description} />
                            </motion.div>
                        );
                    })
                }
            </div>
        </section>
    );
}
