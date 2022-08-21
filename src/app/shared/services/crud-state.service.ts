import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UpdateState } from '../enums/UpdateState';

@Injectable({
  providedIn: 'root',
})
export class CrudStateService {
  state$: Subject<UpdateState> = new Subject();
  entityState$: Subject<any> = new Subject();
  constructor() {}

  getState(): Observable<any> {
    return this.entityState$.asObservable();
  }

  create(): void {
    this.setState(UpdateState.CREATE);
  }

  update(entity: any): void {
    this.setState(UpdateState.UPDATE, entity);
  }

  show(entity: any): void {
    this.setState(UpdateState.SHOW, entity);
  }

  private setState(state: UpdateState, entity?: any) {
    this.entityState$.next({
      state: state,
      entity: entity,
    });
  }
}
