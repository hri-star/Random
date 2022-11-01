import { DatePipe } from '@angular/common';

export module DateHelpers {

  function addZero(v) {
    if (v < 10) return '0' + v;
    return v;
  }


  /**
* Convert datetime to date
* @param object
* @param properties
*/
  export function stripDate(datetime: any): string {
    var date = new Date(datetime);
    var y = date.getFullYear();
    var m = addZero(date.getMonth() + 1);
    var d = addZero(date.getDate());

    return y + '-' + m + '-' + d;
  }


  /**
 * Convert datetime to date only
 * @param object
 * @param properties
 */
  export function datetimeToDate(datetime: any): Date {
    var myDate = new Date(datetime);
    return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
  }

  /**
   * Convert string properties of object to date
   * @param object
   * @param properties
   */
  export function toDate(object: any, properties: string[]): void {
    properties.forEach(p => {
      if (object[p]) {
        object[p] = new Date(object[p]);
      }
    });
  }

  export function replaceDatetimeWithDateOnly(object: any, propertyName: string): any {
    object.forEach(o => {
      if (o[propertyName]) {
        o[propertyName] = DateHelpers.datetimeToDate(o[propertyName]);
      }
    });
    return object;
  }

  /**
   * Convert string properties of multiple object to date
   * @param object
   * @param properties
   */
  export function manyToDate(object: any[], properties: string[]): void {
    object.forEach(o => {
      DateHelpers.toDate(o, properties);
    });
  }

  export function timeStringToDate(time: string): Date {
    return new Date('2018-01-01T' + time);
  }

  export function propertiesToTime(object: any, properties: string[]): void {
    properties.forEach(p => {
      if (object[p]) {
        object[p] = DateHelpers.timeStringToDate(object[p]);
      }
    });
  }

  /**
   * Get the difference in minutes between two dates
   * @param start
   * @param end
   */
  export function getTimeDifference(start: Date, end: Date): number {
    //((moment(c.timeTo, "HH:mm:ss") - moment(c.timeFrom, "HH:mm:ss")) / 1000) / 60;
    return ((end.getTime() - start.getTime()) / 1000) / 60;
  }

  /**
   * Convert date object to timeString 'HH:mm:ss'
   * @param object
   * @param properties
   */
  export function toTime(object: any, properties: string[]): void {
    properties.forEach(p => {
      if (!!object[p]) {
        object[p] = object[p].getHours() + ":" + object[p].getMinutes() + ":" + object[p].getSeconds();
      }
    });
  }

  /**
   * Convert date object to timeString 'HH:mm:ss'
   * @param object
   * @param properties
   */
  export function manyToTime(object: any[], properties: string[]): void {
    object.forEach(o => {
      DateHelpers.toTime(o, properties);
    });
  }

  /**
   * Convert utc Date time and converts it to local 
   * @param object
   * @param properties
   */
  export function toLocalDateTime(date: Date): Date {
    if (!date.toString().endsWith('Z')) {
      return new Date(date.toString() + 'Z');
    }
    else {
      return new Date(date);
    }
  }

  /**
   * Convert datetime of properties to local datetime
   * @param object
   * @param properties
   */
  export function manyToLocalDateTime(object: any[], properties: string[]): void {
    object.forEach(i => {
      properties.forEach(p => {
        if (i[p]) {
          i[p] = DateHelpers.toLocalDateTime(i[p]);
        }
      });
    });
  }

  export function getUTCOffset(date: Date): number {
    return parseInt((-date.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(date.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(date.getTimezoneOffset() / 60)));
  }

  /**
   * Check if given date is between 2 dates
   * @param date Date to check
   * @param minDate Date range min value
   * @param maxDate Date range max value
   */
  export function isDateBetween(date: Date, minDate: Date, maxDate: Date): boolean {
    let result: boolean = false;

    if (date >= DateHelpers.datetimeToDate(minDate) && date <= DateHelpers.datetimeToDate(maxDate)) {
      result = true;
    }

    return result;
  }
  export function ConvertUTCTimeToLocalTime(UTCDateString): string {
    let convertdLocalTime = new Date(UTCDateString);
    let newDate: any = new Date(convertdLocalTime.getTime() - convertdLocalTime.getTimezoneOffset() * 60 * 1000);
    newDate = new DatePipe('en-US').transform(newDate, 'dd MMM y hh:mm a');
    return newDate.toString();
  }

  export function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);



    var dDisplay = d > 0 ? d + (d == 1 ? "d" : "d") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? "h" : "h") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "m" : "m") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  export function timeStringToSeconds(time: string): number {
    let date = new Date('2018-01-01T' + time);
    let baseDate = new Date('2018-01-01T00:00:00');
    let result = date.getTime() - baseDate.getTime();
    result = result / 1000;

    return result;
  }
}

(function () {
  // OK
  Date.prototype.toJSON = function () {
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
  };
})();
