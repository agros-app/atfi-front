import { Variants } from "framer-motion";

export const visionContainerVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.75,
            delay: 0.75,
        },
    },
};

export const visionBorderVariants: Variants = {
    hidden: { width: "0%" },
    visible: {
        width: "40%",
        transition: {
            duration: 1,
            ease: "easeInOut",
        },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.2 } },
};