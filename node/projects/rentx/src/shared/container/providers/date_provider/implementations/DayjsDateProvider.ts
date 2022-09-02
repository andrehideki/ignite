import dayjs from "dayjs";
import { IDateProvider } from "../IDateProvider";

class DayjsDateProvider implements IDateProvider {
    async dateNow(): Promise<Date> {
        return dayjs().toDate();
    }
    
    async compareInHours(startDate: Date, endDate: Date): Promise<number> {
        return dayjs(this.convertToUtc(endDate)).diff(this.convertToUtc(startDate), "hours");
    }

    private convertToUtc(date: Date) {
        return dayjs(date)
            .utc()
            .local()
            .format();
    }
}

export { DayjsDateProvider };

