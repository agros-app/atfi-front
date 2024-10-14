import styles from "./value.module.scss";
import {itemVariants} from "./variants";
import { motion } from "framer-motion";

type ValueProps = {
    heading: string;
    text: string;
}

export default function Value({heading, text}: ValueProps) {
    return(
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
        className={styles.container}>
            <h3 className={styles.heading}>{heading}</h3>
            <p className={styles.text}>{text}</p>
        </motion.div>
    )
}