import { differenceInCalendarDays, startOfToday } from "date-fns";

export const getDaysLeft = (endDate: string) => differenceInCalendarDays(new Date(endDate),startOfToday());

export const getPercentage = (collected: number, goal: number) => Math.floor((collected / goal) * 100);