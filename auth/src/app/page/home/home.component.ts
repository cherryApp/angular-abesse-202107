import { Component, OnInit } from '@angular/core';
import { Lodash } from 'src/app/decorator/lodash.decorator';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@Lodash(['cloneDeep'])
export class HomeComponent implements OnInit {

  user = {
    name: 'Firpo',
    skills: ['run', 'eat'],
  };

  constructor() { }

  ngOnInit(): void {
    const user2 = (this as any).cloneDeep(this.user);
    user2.skills[2] = 'drink';
    console.log(this.user, user2);
  }

}
