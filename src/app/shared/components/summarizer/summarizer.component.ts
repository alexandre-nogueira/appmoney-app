import { Component, Input, OnInit } from '@angular/core';
import { Natures } from '../../enums/Nature';
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
  @Input() value = 0;

  constructor(private postingService: PostingService) {}

  ngOnInit(): void {}

  getClass() {
    if (this.nature === Natures.EXPENSE) {
      return 'fs-4 text-danger';
    } else if (this.nature === Natures.REVENUE) {
      return 'fs-4 text-success';
    } else {
      return 'fs-4';
    }
  }
}
