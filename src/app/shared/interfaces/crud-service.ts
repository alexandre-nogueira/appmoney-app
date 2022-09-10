import { Observable } from 'rxjs';
export declare interface CrudService {
  refreshList(args?: string[]): void;

  getList(args?: string[]): Observable<any>;

  getSingle(id: number): Observable<any>;

  create(T: any): Observable<any>;

  edit(T: any): Observable<any>;

  delete(T: any): Observable<any>;
}
