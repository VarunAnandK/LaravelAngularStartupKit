
import { formatDate } from '@angular/common';

export class DateFormat {

  public static GetCurrentDate(): string {
    return formatDate(new Date(), 'dd-MM-yy', 'en-us');
  }
  public static GetCurrentYear(): string {
    return formatDate(new Date(), 'yyyy', 'en-us');
  }
  public static GetCurrentMonth(): string {
    return formatDate(new Date(), 'MM', 'en-us');
  }
  public static FormatDate(Datevalue: Date): string {
    return formatDate(Datevalue, 'yyyy-MM-dd', 'en-us');
  }
  public static FormatDateToDP(Datevalue: Date): string {
    return formatDate(Datevalue, 'dd-MMM-yyyy', 'en-us');
  }
}
