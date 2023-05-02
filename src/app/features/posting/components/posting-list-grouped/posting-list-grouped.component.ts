import { PostingCategory } from 'src/app/features/posting-category/interfaces/posting-category';
import { Component, OnInit } from '@angular/core';
import { PostingService } from '../../services/posting.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PostingsGrouped, Postings } from '../../interfaces/posting';
import { tap } from 'rxjs';
import { Natures } from 'src/app/shared/enums/Nature';

@Component({
  selector: 'posting-list-grouped',
  templateUrl: './posting-list-grouped.component.html',
  styleUrls: ['./posting-list-grouped.component.scss'],
})
export class PostingListGroupedComponent implements OnInit {
  resolved = false;
  postingsGrouped: Array<PostingsGrouped> = [];

  constructor(
    private postingService: PostingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.postingService.getList().subscribe({
      next: (result) => {
        this.resolved = true;
        if (result.data) {
          const groupedData = this.setTotalsByPostingCategory(result.data);
          this.postingsGrouped = [];
          groupedData.forEach((data) => {
            this.postingsGrouped.push({
              postingCategory: data.postingCategory,
              total: data.value,
            });
          });
        }
      },
      complete: () => {
        this.resolved = true;
      },
      error: (error) => {
        this.resolved = true;
        this.alertService.danger('Erro ao selecionar lançamentos');
        console.log(error);
      },
    });
  }

  setTotalsByPostingCategory(postings: Postings) {
    const acumulador: {
      [key: number]: { postingCategory?: PostingCategory; value: number };
    } = {};
    for (const { postingCategory, value } of postings) {
      const key = postingCategory?.id ?? 0;
      if (acumulador[key]) {
        acumulador[key].value += value ?? 0;
      } else {
        acumulador[key] = { postingCategory, value: value ?? 0 };
      }
    }
    const novoArray = Object.entries(acumulador).map(
      ([id, { postingCategory, value }]) => ({ postingCategory, value })
    );

    novoArray.sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });

    return novoArray;
  }

  getTotalsClass(nature?: Natures) {
    if (nature === Natures.EXPENSE) {
      return 'text-danger fs-4 fw-bold';
    } else {
      return 'text-success fs-4 fw-bold';
    }
  }
}
