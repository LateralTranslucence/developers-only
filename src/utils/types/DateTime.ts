export interface DateTime {
    stamp: number;
    iso8601: string;
    formatted: string;
    month: string;
    day: string;
    year: string;
    time?: string;
    timezone?: string;
    timezoneFull?: string;
}