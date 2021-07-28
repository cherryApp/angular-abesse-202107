import { SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IndexMapperPipe } from '../pipe/index-mapper.pipe';

export interface INavItem {
  url: string;
  text: string;
}

export interface ITableColumn {
  key: string;
  title: string;
  pipes?: any[];
  pipeArgs?: any[][];
}

export interface ISetttings {
  navItems: INavItem[];
  userTableColumns: ITableColumn[];
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = `http://localhost:3000/`;

  navItems$: BehaviorSubject<INavItem[]> = new BehaviorSubject<INavItem[]>([
    {url: '/', text: 'Home'},
  ]);

  userTableColumns$: BehaviorSubject<ITableColumn[]> = new BehaviorSubject<ITableColumn[]>([
    {key: 'id', title: '#'},
  ]);

  roles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  bootstrap(): () => void {
    return (): void => {
      this.http.get<ISetttings>(`${this.apiUrl}settings`).subscribe(
        settings => {
          this.roles$.next(settings.roles);
          this.navItems$.next(settings.navItems);
          const columns = settings.userTableColumns.map( col => {
            col.pipes = col.pipes ? col.pipes.map( p => this.getPipe(p) ) : [];
            return col;
          });
          this.userTableColumns$.next(columns);
        }
      );
    }
  }

  getPipe(name: string): any {
    return {
      RolePipe: new IndexMapperPipe(this.roles$.value),
      SlicePipe: new SlicePipe()
    }[name];
  }

}
