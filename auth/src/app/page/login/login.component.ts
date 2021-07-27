import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  setPasswords(): void {
    for (const index of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      this.userService.update({id: index, password: 'test'}).subscribe(
        user => console.log(user)
      )
    }
  }

}
