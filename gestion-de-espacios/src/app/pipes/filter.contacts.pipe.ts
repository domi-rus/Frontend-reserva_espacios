import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContacts'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFilter = [];

    for (const filter of value) {
      console.log(arg)
      if (filter.company.toUpperCase().indexOf(arg.toUpperCase()) > -1) {
        resultFilter.push(filter);
      }
    }

    return resultFilter;
  }

}