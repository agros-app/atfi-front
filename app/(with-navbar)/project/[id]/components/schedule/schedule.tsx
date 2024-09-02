import styles from './schedule.module.scss';
import {getDaysLeft} from "@/utils";

import { differenceInCalendarDays, startOfToday, addDays, format } from "date-fns";
import { es } from "date-fns/locale";

type ScheduleProps = {
    startDate: string;
    endDate: string;
}

export default function Schedule({ startDate, endDate }: ScheduleProps) {

    const endDateParsed = new Date(endDate);
    const roundClosingDate = format(endDateParsed, "d 'de' MMMM 'de' yyyy", { locale: es });

    const returnDate = addDays(endDateParsed, 90);//TODO: Change this when the return date is defined
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