import { AccountCategories } from 'src/app/features/account-category/interfaces/account-category';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable',
})
export class FilterTablePipe implements PipeTransform {
  transform(items: AccountCategories, searchText: string): AccountCategories {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter((item) => {
      return item.description.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
