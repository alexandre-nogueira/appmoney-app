import { Observable } from 'rxjs';
export declare interface CrudService {
  refreshList(): void;

  getList(): Observable<any>;

  getSingle(id: number): Observable<any>;

  create(T: any): Observable<any>;

  edit(T: any): Observable<any>;

  delete(T: any): Observable<any>;
}
