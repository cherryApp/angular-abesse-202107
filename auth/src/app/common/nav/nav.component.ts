import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService, INavItem } from 'src/app/service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navItems$: BehaviorSubject<INavItem[]> = this.config.navItems$;

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
