import React from 'react';
import styles from './shedule.module.scss';

type ScheduleProps = {
    investementEndDate:string,
    harvestDate:string,
}


export default function Shedule(
    {
        investementEndDate,
        harvestDate
    }: ScheduleProps
) {
    return (
        <div className={styles.container}>
            <div className={styles.topData}>
                <div className={styles.leftHandSide}>
                    <p>Cierre de la ronda</p>
                    <p>{getDateWithDay(investementEndDate)}</p>
                </div>
                <div className={styles.rightHandSide}>
                    <p>{getRemainingDays(investementEndDate)}</p>
                </div>
            </div>
            <div className={styles.bottomData}>
                <div className={styles.leftHandSide}>
                    <p>Mes estipulado de retornos</p>
                    <p>{getDateWithoutDay(harvestDate)}</p>
                </div>
                <div className={styles.rightHandSide}>
                    <p>{getRemainingDays(harvestDate)}</p>
                </div>
            </div>

        </div>
    );
}

function transformDate(fechaISO: string) {
    const date = new Date(fechaISO);

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Obtener el día, mes y año de la fecha
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Devolver una lista con el día, mes y año
    return [year, month, day];
}

function getDateWithDay(fechaISO: string){
    const [year, month, day] = transformDate(fechaISO);
    return `${day} de ${month} de ${year}`;
}

function getDateWithoutDay(fechaISO: string){
    const [year, month, day] = transformDate(fechaISO);
    return `${month} de ${year}`;
}

function remainingDays(fechaISO: string){
    const date = new Date(fechaISO);
    const today = new Date();
    const difference = date.getTime() - today.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24));
}

function getRemainingDays(fechaISO: string){
    const remaining = remainingDays(fechaISO);
    if(remaining === 1){
        return `${remaining} día restante`;
    } else if( 1 < remaining && remaining < 31) {
        return `${remaining} días restantes`;
    }
    else if (remaining === 0){
        return getLessThanADayRemaining(fechaISO);
    }
    else if (remaining > 31 && remaining < 62){
        const remainingMonths = Math.ceil(remaining / 30);
        return `En ${remainingMonths} mes`;
    }
    else if (remaining > 62 && remaining < 365){
        const remainingMonths = Math.floor(remaining / 30);
        return `En ${remainingMonths} meses`;
    }
    else if (remaining > 365) {
        const remainingYears = Math.floor(remaining / 365);
        if (remainingYears === 1) {
            const remainingmonths = Math.floor((remaining % 365) / 30);
            if (remainingmonths === 1) {
                return `En 1 año y 1 mes`;
            } else if (remainingmonths === 0) {
                return `En 1 año`;
            } else
                return `En 1 año y ${remainingmonths} meses`;
        }
        return `En ${remainingYears} años`;
    }
}
function getLessThanADayRemaining(fechaISO: string): string {
    const date = new Date(fechaISO);
    const today = new Date();
    const difference = date.getTime() - today.getTime();

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 1) {
        return `${hours} horas`;
    } else if (minutes > 1) {
        return `${minutes} minutos`;
    } else {
        return ">1 minuto";
    }
}