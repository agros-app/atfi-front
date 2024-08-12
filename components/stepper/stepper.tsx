import React from 'react';
import styles from './stepper.module.scss';

interface StepProps {
    title: string;
    description: string;
    date: string;
}

const Step: React.FC<StepProps> = ({ title, description, date }) => {
    return (
        <div className={styles.stepContainer}>
            <div className={styles.stepIconContainer}>
                <div className={styles.stepIcon} />
                <div className={styles.stepLine} />
            </div>
            <div>
                <h4 className={styles.stepTitle}>{title}</h4>
                <p className={styles.stepDescription}>{description}</p>
                <small className={styles.stepDate}>{date}</small>
            </div>
        </div>
    );
};

interface StepperProps {
    steps: { title: string; description: string; date: string }[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
    return (
        <div className={styles.stepContent}>
            {steps.map((step, index) => (
                <Step key={index} title={step.title} description={step.description} date={step.date} />
            ))}
        </div>
    );
};

export default Stepper;
