import styles from './schedule.module.scss';
import { getDaysLeft } from "@/utils";
import { differenceInCalendarDays, startOfToday, addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import TitleWithLine from "@/app/(with-navbar)/project/[id]/components/titleWithLine/titleWithLine";

type ScheduleProps = {
    startDate: string;
    endDate: string;
    startFarming?: string;
    endFarming?: string;
}

export default function Schedule({ startDate, endDate, startFarming, endFarming }: ScheduleProps) {

    const formatOrDefault = (dateStr?: string) => {
        if (!dateStr) return 'Fecha no disponible';
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? 'Fecha no disponible' : format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
    };

    const roundStartDateFinance = formatOrDefault(startDate);
    const roundEndDateFinance = formatOrDefault(endDate);
    const roundStartDateFarming = formatOrDefault(startFarming);
    const roundEndDateFarming = formatOrDefault(endFarming);

    return (
        <div className={styles.container}>
            <TitleWithLine>Cronograma</TitleWithLine>
            <div className={styles.innerContainer}>
                <div className={styles.topData}>
                    <div className={styles.leftHandSide}>
                        <p>Inicio ronda de Inversión</p>
                        <p>{roundStartDateFinance}</p>
                    </div>
                    <div className={styles.rightHandSide}>
                        <p>{getDaysLeft(startDate)}</p>
                    </div>
                </div>
                <div className={styles.topData}>
                    <div className={styles.leftHandSide}>
                        <p>Cierre de la ronda de Inversión</p>
                        <p>{roundEndDateFinance}</p>
                    </div>
                    <div className={styles.rightHandSide}>
                        <p>{getDaysLeft(endDate)}</p>
                    </div>
                </div>
                <div className={styles.topData}>
                    <div className={styles.leftHandSide}>
                        <p>Inicio de campaña</p>
                        <p>{roundStartDateFarming}</p>
                    </div>
                    <div className={styles.rightHandSide}>
                        <p>{getDaysLeft(startFarming || '')}</p>
                    </div>
                </div>
                <div className={styles.topData}>
                    <div className={styles.leftHandSide}>
                        <p>Cierre de campaña</p>
                        <p>{roundEndDateFarming}</p>
                    </div>
                    <div className={styles.rightHandSide}>
                        <p>{getDaysLeft(endFarming || '')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
