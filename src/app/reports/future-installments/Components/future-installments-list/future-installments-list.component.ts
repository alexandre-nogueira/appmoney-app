import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Postings } from 'src/app/features/posting/interfaces/posting';

@Component({
  selector: 'future-installments-list',
  templateUrl: './future-installments-list.component.html',
  styleUrls: ['./future-installments-list.component.scss'],
})
export class FutureInstallmentsListComponent implements OnChanges {
  @Input() futureInstallments!: Postings;

  // filteredInstallments!: Postings;

  // constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.filteredInstallments = this.futureInstallments;
    // this.filteredInstallments = this.filterDataByMonth(
    //   this.month,
    //   this.futureInstallments
    // );
  }
}
