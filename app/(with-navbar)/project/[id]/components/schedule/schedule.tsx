import styles from './schedule.module.scss';
import {getDaysLeft} from "@/utils";

import { differenceInCalendarDays, startOfToday, addDays, format } from "date-fns";
import { es } from "date-fns/locale";

type ScheduleProps = {
    startDate: string;
    endDate: string;
}

export default function Schedule({ startDate, endDate }: ScheduleProps) {

    //Change this when the start date of cultivation is defined
    const endDateParsed = addDays(new Date(endDate),90);
    const roundClosingDate = format(endDateParsed, "d 'de' MMMM 'de' yyyy", { locale: es });

    //Change this when the return date is defined
    const returnDate = addDays(endDateParsed, 90);
    const estimatedReturnDate = format(returnDate, "d 'de' MMMM 'de' yyyy", { locale: es });

    return (
        <div className={styles.container}>
            <div className={styles.topData}>
                <div className={styles.leftHandSide}>
                    <p>Cierre de la ronda</p>
                    <p>{roundClosingDate}</p>
                </div>
                <div className={styles.rightHandSide}>
                    <p>{`${getDaysLeft(endDate)} días restantes`}</p>
                </div>
            </div>
            <div className={styles.bottomData}>
                <div className={styles.leftHandSide}>
                    <p>Mes estipulado de retornos</p>
                    <p>{estimatedReturnDate}</p>
                </div>
                <div className={styles.rightHandSide}>
                    <p>{`${getDaysLeft(returnDate.toString())} días restantes`}</p>
                </div>
            </div>
        </div>
    );
}