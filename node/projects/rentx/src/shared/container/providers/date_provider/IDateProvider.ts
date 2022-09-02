export interface IDateProvider {
    compareInHours(startDate: Date, endDate: Date): Promise<any>;
    dateNow(): Promise<Date>;
}