import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Observable, tap } from 'rxjs';
import { FutureInstallmentsSearchParams } from 'src/app/features/posting/enums/futureInstallmentsSearchParams';
import { Postings } from 'src/app/features/posting/interfaces/posting';
import { PostingService } from 'src/app/features/posting/services/posting.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Natures } from 'src/app/shared/enums/Nature';

@Component({
  selector: 'future-installments-main',
  templateUrl: './future-installments-main.component.html',
  styleUrls: ['./future-installments-main.component.scss'],
})
export class FutureInstallmentsMainComponent implements OnInit {
  futureInstallments$!: Observable<Postings>;
  resolved = false;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;

  nature = Natures;

  totalInstallments = 0;
  baseMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)
    .toJSON()
    .slice(0, 10);
  targetMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toJSON()
    .slice(0, 10);

  constructor(
    private postingService: PostingService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.activatedRoute.snapshot.params[
        FutureInstallmentsSearchParams.BASEMONTH
      ]
    ) {
      this.baseMonth =
        this.activatedRoute.snapshot.params[
          FutureInstallmentsSearchParams.BASEMONTH
        ];
    }

    if (
      this.activatedRoute.snapshot.params[
        FutureInstallmentsSearchParams.TARGETMONTH
      ]
    ) {
      this.targetMonth =
        this.activatedRoute.snapshot.params[
          FutureInstallmentsSearchParams.TARGETMONTH
        ];
    }

    const routeParams = this.updateSearchParameters(
      this.baseMonth,
      this.targetMonth
    );

    this.postingService.refreshFutureInstallments(routeParams);

    this.futureInstallments$ = this.postingService.getFutureInstallments().pipe(
      tap({
        next: (data) => {
          this.setTotal(data);
          this.resolved = true;
        },
        complete: () => {
          this.resolved = true;
        },
        error: (error) => {
          this.resolved = true;
          console.log(error);
          this.alertService.danger('Erro ao selecionar compras futuras');
        },
      })
    );
  }

  updateSearchParameters(baseMonth: string, targetMonth: string): Params {
    const newParams: Params = [];

    newParams[FutureInstallmentsSearchParams.BASEMONTH] = baseMonth;

    newParams[FutureInstallmentsSearchParams.TARGETMONTH] = targetMonth;

    this.router.navigate(['/reports/futureInstallments', newParams]);
    return newParams;
  }

  setMonth(months: number) {
    const targetMonthUpdated = new Date(this.targetMonth);
    const baseMonth = new Date(this.baseMonth);
    targetMonthUpdated.setMonth(targetMonthUpdated.getMonth() + months);
    if (targetMonthUpdated <= baseMonth) return;
    this.targetMonth = targetMonthUpdated.toJSON().slice(0, 10);

    const routeParams = this.updateSearchParameters(
      this.baseMonth,
      this.targetMonth
    );

    this.postingService.refreshFutureInstallments(routeParams);
  }

  setTotal(futureInstallments: Postings) {
    this.totalInstallments = futureInstallments.reduce(
      (total, posting) => (total += posting.value ?? 0),
      0
    );
    return this.totalInstallments;
  }
}
