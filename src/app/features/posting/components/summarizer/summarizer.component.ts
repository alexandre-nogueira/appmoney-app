import { Component, Input, OnInit } from '@angular/core';
import { Natures } from '../../../../shared/enums/Nature';
import { PostingService } from 'src/app/features/posting/services/posting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'summarizer',
  templateUrl: './summarizer.component.html',
  styleUrls: ['./summarizer.component.scss'],
})
export class SummarizerComponent implements OnInit {
  @Input() nature: Natures = Natures.EXPENSE;
  @Input() label = 'Total';
  value$!: Observable<number>;

  constructor(private postingService: PostingService) {}

  ngOnInit(): void {
    if (this.nature === Natures.EXPENSE) {
      this.value$ = this.postingService.getExpenseTotal();
    } else {
      this.value$ = this.postingService.getRevenueTotal();
    }
  }

  getClass() {
    if (this.nature === Natures.EXPENSE) {
      return 'display-6 text-danger';
    } else {
      return 'display-6 text-success';
    }
  }
}
