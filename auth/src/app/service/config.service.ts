import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface INavItem {
  url: string;
  text: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = `http://localhost:3000/`;

  navItems$: BehaviorSubject<INavItem[]> = new BehaviorSubject<INavItem[]>([
    {url: '/', text: 'Home'},
  ]);

  constructor(
    private http: HttpClient,
  ) { }

  bootstrap(): () => void {
    return (): void => {
      this.http.get<INavItem[]>(`${this.apiUrl}navItems`).subscribe(
        items => this.navItems$.next(items)
      );
    }
  }
}
