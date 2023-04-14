import { Pipe, PipeTransform } from '@angular/core';
import { PostingStatus } from '../enums/posting-status';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case PostingStatus.PENDING:
        return 'Pendente';
      case PostingStatus.PAID:
        return 'Pago';
      case PostingStatus.DELETED:
        return 'Eliminado';
      case PostingStatus.REVERSED:
        return 'Pendente';
      default:
        return 'Status inválido';
    }
  }
}
