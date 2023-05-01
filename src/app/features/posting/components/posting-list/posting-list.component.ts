import { PostingService } from './../../services/posting.service';
import { ActivatedRoute } from '@angular/router';
import { Posting, PostingsPaginated } from './../../interfaces/posting';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Natures } from 'src/app/shared/enums/Nature';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { DefaultSizes } from 'src/app/shared/utils/layout/default-sizes';
import { PostingCategory } from 'src/app/features/posting-category/interfaces/posting-category';
import { PostingGroup } from 'src/app/features/posting-group/interfaces/posting-group';

@Component({
  selector: 'posting-list',
  templateUrl: './posting-list.component.html',
  styleUrls: ['./posting-list.component.scss'],
})
export class PostingListComponent implements OnInit {
  postingList$!: Observable<PostingsPaginated>;
  resolved = false;
  defaultSizes = DefaultSizes;

  constructor(
    private postingService: PostingService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.postingList$ = this.postingService.getList().pipe(
      tap({
        next: (result) => {
          this.resolved = true;
          this.setTotals(result);
        },
        complete: () => {
          this.resolved = true;
        },
        error: (error) => {
          this.resolved = true;
          this.alertService.danger('Erro ao selecionar lançamentos');
          console.log(error);
        },
      })
    );
  }

  setTotals(postingsPagiinated: PostingsPaginated) {
    let revenues = 0;
    let expenses = 0;
    postingsPagiinated.data.forEach((posting) => {
      if (posting.postingCategory?.nature === Natures.REVENUE) {
        revenues += posting.value ?? 0;
      } else {
        expenses += posting.value ?? 0;
      }
    });
    this.postingService.setTotal(revenues, Natures.REVENUE);
    this.postingService.setTotal(expenses, Natures.EXPENSE);
  }

  showDetail(posting: Posting) {
    this.postingService.openDetailDialog(
      posting,
      this.activatedRoute.snapshot.params
    );
  }

  getValueClass(posting: Posting): string {
    if (posting.postingCategory?.nature === Natures.EXPENSE) {
      return 'text-danger';
    } else {
      return 'text-success';
    }
  }

  postingCategorySelected(postingCategory: PostingCategory, posting: Posting) {
    posting.postingCategoryId = postingCategory.id;
    posting.postingCategory = postingCategory;
    this.postingService.edit(posting).subscribe({
      next: () => {
        this.alertService.success('Categoria atualizada');
        this.postingService.refreshList(this.activatedRoute.snapshot.params);
      },
      error: (error) => {
        this.alertService.danger('Erro ao atualizar categoria');
        console.log(error);
      },
    });
  }

  postingGroupSelected(postingGroup: PostingGroup, posting: Posting) {
    posting.postingGroupId = postingGroup.id;
    posting.postingGroup = postingGroup;
    this.postingService.edit(posting).subscribe({
      next: () => {
        this.alertService.success('Lançamento atualizado');
        this.postingService.refreshList(this.activatedRoute.snapshot.params);
      },
      error: (error) => {
        this.alertService.danger('Erro ao atualizar lançamento');
        console.log(error);
      },
    });
  }
}
