import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {id?: number}> {

  entityName: string = '';

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.apiUrl}${this.entityName}`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}${this.entityName}/${id}`);
  }

  query(queryString: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.config.apiUrl}${this.entityName}?${queryString}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.config.apiUrl}${this.entityName}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.config.apiUrl}${this.entityName}/${entity.id}`, entity);
  }

  remove(id: number): Observable<T> {
    return this.http.delete<T>(`${this.config.apiUrl}${this.entityName}/${id}`);
  }
}
