import { Component, Input, OnInit } from '@angular/core';
import { PostingStatus } from '../../enums/posting-status';

@Component({
  selector: 'posting-status',
  templateUrl: './posting-status.component.html',
  styleUrls: ['./posting-status.component.scss'],
})
export class PostingStatusComponent implements OnInit {
  @Input() status!: string;

  constructor() {}

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case PostingStatus.PENDING:
        return 'badge rounded-pill bg-warning';
      case PostingStatus.PAID:
        return 'badge rounded-pill bg-success';
      case PostingStatus.REVERSED:
        return 'badge rounded-pill bg-warning';
      case PostingStatus.DELETED:
        return 'badge rounded-pill bg-danger';
      default:
        return 'badge rounded-pill bg-primary';
    }
  }
}
