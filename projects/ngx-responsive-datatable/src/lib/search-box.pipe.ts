import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBox',
})
export class SearchBoxPipe implements PipeTransform {
  transform(values: any[], arg: any): any {
    if (values && values.length && arg) {
      const filteredArray = values.filter((object) => {
        console.log(object);
        const rx = new RegExp(arg, 'i');
        return Object.keys(object).some((key) => {
          const newObject = object[key].toString().match(rx);
          return newObject;
        });
      });
      return filteredArray;
    }
    return values;
  }
}
