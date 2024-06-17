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
        image: "/landing/pexels-alejandro-barron-21404-96715.png",
        reverse: false,
    },
    {
        title: "Invertí",
        description: "Seleccioná la oportunidad de inversión que mejor se adapte a tus objetivos financieros y estrategias de inversión. Nuestra plataforma te ofrece una amplia gama de opciones cuidadosamente seleccionadas para ayudarte a maximizar tus rendimientos. Con una interfaz intuitiva y fácil de usar, invertir en el sector agro nunca ha sido tan accesible.",
        icon: "https://cdn-icons-png.flaticon.com/512/1160/1160908.png",
        image: "/landing/pexels-pixabay-163752.jpg",
        reverse: true,
    },
    {
        title: "Ganá",
        description: "Una vez finalizado el proyecto se te reintegrará el total más los intereses obtenidos. Nos enorgullecemos de ofrecer retornos competitivos y transparentes. Desde el momento en que realizas tu inversión, puedes seguir el progreso del proyecto a través de nuestra plataforma, con actualizaciones periódicas y acceso a informes detallados. ",
        icon: "https://cdn-icons-png.flaticon.com/512/1160/1160908.png",
        image: "/landing/pexels-alimuart-15968979.png",
        reverse: false,
    },
];

const vision = 'ATFI visualiza un futuro donde la financiación agrícola sea democratizada y transparente. Al liderar la integración de la tecnología de criptomonedas en los modelos de financiación tradicionales, ATFI busca derribar barreras y empoderar a las personas para que participen en la economía agrícola como nunca antes. A través de una adaptación continua a las necesidades del mercado, ATFI aspira a revolucionar la forma en que se financia la agricultura, garantizando que los recursos se asignen de manera eficiente para el beneficio tanto de los inversores como de los productores agropecuarios.'

const featureList = [
    {
        title: 'Transparencia',
        description: 'ATFI visualiza un futuro con una financiación agrícola accesible y clara. La transparencia y la trazabilidad son fundamentales para nosotros, por lo que proporcionamos actualizaciones periódicas y detalladas sobre el progreso de cada proyecto.'
    },
    {
        title: 'Retornos competitivos',
        description: 'Ofrece retornos competitivos y transparentes a los inversores. Desde el momento en que realizas tu inversión, puedes seguir el progreso de la inversion a través de nuestra plataforma con informacion en tiempo real.'
    },
    {
        title: 'Innovación tecnológica',
        description: ' Lidera la integración de criptomonedas en modelos de financiación tradicionales. Mediante la adopción de tecnologías innovadoras, ATFI busca derribar barreras y empoderar a las personas para que participen en la economía agrícola como nunca antes.'
    },
    {
        title: 'Oportunidades',
        description: 'Facilita el acceso de los agricultores a mercados globales, mejorando sus oportunidades de venta. Brinda a los agricultores la posibilidad de acceder a financiación a tasas competitivas, lo que les permite expandir sus operaciones y aumentar su producción.'
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

const visionContainerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.75,
            delay: 0.75
        },
    },
};

const visionBorderVariants = {
    hidden: { width: '0%' },
    visible: {
        width: '40%',
        transition: {
            duration: 1,
            ease: "easeInOut"
        }
    }
};

export default function HowItWorks() {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref);

    const Feature = ({ title, description }: any) => (
        <motion.div
            className={styles.feature}>
            <h2 className={styles.featureTitle}>{title}</h2>
            <div className={styles.featureDescription}>
                <p>{description}</p>
            </div>
        </motion.div>
    );


    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);


    return (
        <section className={styles.container}>
            <motion.div
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className={styles.howItWorksContainer}
            >
                <motion.p
                    ref={ref}
                    variants={itemVariants}
                    className={styles.howItWorksDescription}
                >
                    Descubrí una forma sencilla y efectiva de hacer crecer tus finanzas. Te guiamos
                    a través de cada paso para que puedas invertir con confianza y obtener los mejores resultados.
                </motion.p>
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={visionBorderVariants}
                    className={styles.visionBorder}
                />
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={visionContainerVariants}
                    className={styles.visionContainer}
                >
                    {
                        featureList.map((item, index) => (
                            <Feature key={index} title={item.title} description={item.description}/>
                        ))
                    }
                </motion.div>
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

