import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface INavItem {
  url: string;
  text: string;
}

export interface IUserTableColumn {
  key: string;
  title: string;
  pipes?: any[];
  pipeArgs?: any[][];
}

export interface ISetttings {
  navItems: INavItem[];
  userTableColumns: IUserTableColumn[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = `http://localhost:3000/`;

  navItems$: BehaviorSubject<INavItem[]> = new BehaviorSubject<INavItem[]>([
    {url: '/', text: 'Home'},
  ]);

  userTableColumns$: BehaviorSubject<IUserTableColumn[]> = new BehaviorSubject<IUserTableColumn[]>([
    {key: 'id', title: '#'},
  ]);

  constructor(
    private http: HttpClient,
  ) { }

  bootstrap(): () => void {
    return (): void => {
      this.http.get<ISetttings>(`${this.apiUrl}settings`).subscribe(
        settings => {
          this.navItems$.next(settings.navItems);
          this.userTableColumns$.next(settings.userTableColumns);
        }
      );
    }
  }
}
