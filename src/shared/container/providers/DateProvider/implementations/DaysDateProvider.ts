import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
export class DaysDateProvider implements IDateProvider{
  addDays(days: number):Date{
    return dayjs().add(days,"days").toDate()
  }
  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)
   return  dayjs(end_date_utc).diff(start_date_utc,"days")
  }
  dateNow(): Date {
    return dayjs().toDate()
  }
  convertToUTC(date: Date): string {

    return dayjs(date).utc().local().format()
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)
   return  dayjs(end_date_utc).diff(start_date_utc,"hours")
  }

}