export interface PrayerDto {
    title: string
    url: string
    startDate: Date
    endDate: Date
    frequency: {
        value: number;
        unit: 'minutes' | 'hours' | 'days';
    };
}