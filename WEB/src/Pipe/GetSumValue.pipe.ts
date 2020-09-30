import { Pipe, PipeTransform, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'GetSumValue'
})
export class GetSumValuePipe implements PipeTransform {
  transform(value: any, Columnname: any, SingelFilter = "", SingelFilterValue = ""): any {
    if (SingelFilter != "") {
      value = value.filter(o => o[SingelFilter] == SingelFilterValue);
    }
    if (value == null) {
      return 0;
    }
    else {
      let Amount = 0;
      Amount = value.reduce((ya, u) =>
        parseFloat(ya.toString()) +
        parseFloat(u[Columnname].toString()),
        0
      );
      return Amount;
    }
  }

}
