import { PostingCategory } from 'src/app/features/posting-category/interfaces/posting-category';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PostingService } from '../../services/posting.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import {
  PostingsGrouped,
  Postings,
  PostingsPaginated,
} from '../../interfaces/posting';
import { Natures } from 'src/app/shared/enums/Nature';
import { GroupPostingsBy } from '../../enums/group-postings-by';
import { PostingGroup } from 'src/app/features/posting-group/interfaces/posting-group';

@Component({
  selector: 'posting-list-grouped',
  templateUrl: './posting-list-grouped.component.html',
  styleUrls: ['./posting-list-grouped.component.scss'],
})
export class PostingListGroupedComponent implements OnChanges {
  resolved = false;
  postingsGrouped: Array<PostingsGrouped> = [];
  @Input() postings!: Postings | undefined;
  @Input() title = 'Não Classificados';
  @Input() groupBy = GroupPostingsBy.CATEGORY;
  @Input() nature = Natures.NONE;

  constructor(
    private postingService: PostingService,
    private alertService: AlertService
  ) {}

  ngOnChanges(): void {
    if (this.postings) {
      this.postingsGrouped =
        this.groupBy === GroupPostingsBy.CATEGORY
          ? this.setTotals(this.postings, GroupPostingsBy.CATEGORY)
          : this.setTotals(this.postings, GroupPostingsBy.GROUP);
    }
  }

  setTotals(postings: Postings, groupBy: GroupPostingsBy) {
    const testeGrouped: Array<PostingsGrouped> = [];

    postings.forEach((posting) => {
      const id =
        groupBy === GroupPostingsBy.CATEGORY
          ? posting.postingCategory?.id ?? 0
          : posting.postingGroup?.id ?? 0;
      const index = testeGrouped.findIndex((p) => p.id === id);
      if (index !== -1) {
        testeGrouped[index].total += posting.value ?? 0;
      } else {
        const description =
          groupBy === GroupPostingsBy.CATEGORY
            ? posting.postingCategory?.description ?? ''
            : posting.postingGroup?.description ?? '';
        testeGrouped.push({
          id: id,
          description: description,
          total: posting.value ?? 0,
        });
      }
    });
    testeGrouped.sort((a, b) => {
      return a.total < b.total ? 1 : -1;
    });
    return testeGrouped;
  }

  getTotalsClass(nature?: Natures) {
    if (!nature) {
      return 'fs-6 fw-bold';
    }
    if (nature === Natures.EXPENSE) {
      return 'text-danger fs-6 fw-bold';
    } else {
      return 'text-success fs-6 fw-bold';
    }
  }
}
