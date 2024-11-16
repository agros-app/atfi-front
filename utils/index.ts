import { differenceInCalendarDays, startOfToday } from "date-fns";

export function getDaysLeft(dateStr: string) {
    const targetDate = new Date(dateStr);
    const daysLeft = differenceInCalendarDays(targetDate, startOfToday());

    return daysLeft >= 0 ? `${daysLeft} días restantes` : `Hace ${Math.abs(daysLeft)} días`;
}

export const getPercentage = (collected: number, goal: number) => Math.floor((collected / goal) * 100);