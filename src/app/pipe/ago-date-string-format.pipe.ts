import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agoDateStringFormat'
})
/**
 * Shows string with the number of seconds, minutes, hours or days that went by from the passed date.
 * Example: Date X: 10.09.2020 - Today: 10.10.2020 -> Date X will generate the String "1 month ago".
 */
export class AgoDateStringFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
