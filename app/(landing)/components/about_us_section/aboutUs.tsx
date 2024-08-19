"use client";
import { motion } from "framer-motion";
import styles from "./aboutUs.module.scss";
import OwnerProfile from "@/components/ownerProfile/ownerProfile";

const animationStyles = {
    container: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 1 },
    },
    title: {
        initial: { y: -50, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 1 },
    },
    us: {
        initial: { y: 50, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 1 },
    },
    profile: {
        initial: { scale: 0.8, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 1 },
    }
};

export default function AboutUs() {
    return (
        <motion.section className={styles.container} id="about-us" {...animationStyles.container}>
            <motion.h2 className={styles.title} {...animationStyles.title}>
                Nuestro equipo ejecutivo
            </motion.h2>
            <motion.div className={styles.us} {...animationStyles.us}>
                <motion.div {...animationStyles.profile}>
                    <OwnerProfile
                        src="/owners/gian.jpg"
                        name={"Gianluca Chiaverano"}
                        job={"Co-Founder & COO"}
                    />
                </motion.div>
                <motion.div {...animationStyles.profile}>
                    <OwnerProfile
                        src="/owners/nico.jpg"
                        name={"Nicolas Ruíz Natale"}
                        job={"Co-Founder & CEO"}
                    />
                </motion.div>
                <motion.div {...animationStyles.profile}>
                    <OwnerProfile
                        src="/owners/gabi.jpg"
                        name={"Gabriel Giana"}
                        job={"Co-Founder & CTO"}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
