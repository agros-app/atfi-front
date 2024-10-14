export const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Delay between the appearance of each child
        },
    },
};
