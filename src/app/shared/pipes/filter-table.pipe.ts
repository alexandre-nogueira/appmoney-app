import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable',
})
export class FilterTablePipe implements PipeTransform {
  transform(items: Array<any>, searchText: string): Array<any> {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter((item) =>
      Object.keys(item).some((field) =>
        item[field].toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
}
