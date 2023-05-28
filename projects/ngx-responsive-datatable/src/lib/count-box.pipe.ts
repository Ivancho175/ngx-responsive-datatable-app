import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countBox',
})
export class CountBoxPipe implements PipeTransform {
  transform(values: any[], args: any): any {
    if (values && values.length && args) {
      const { limit, offset } = args;
      const newLimit = offset + +limit;
      const filteredArray: any[] = values.slice(offset, newLimit);
      return filteredArray;
    }
    return values;
  }
}
