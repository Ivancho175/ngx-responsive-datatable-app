import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBox',
})
export class SearchBoxPipe implements PipeTransform {
  transform(values: any[], arg: any): any {
    if (values && values.length && arg) {
      const filteredArray = values.filter((object) => {
        const rx = new RegExp(arg, 'i');
        return Object.keys(object.value).some((key) => {
          return object.value[key].toString().match(rx);
        });
      });
      return filteredArray;
    }
    return values;
  }
}
