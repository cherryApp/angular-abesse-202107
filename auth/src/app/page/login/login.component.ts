import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login(this.loginData).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          console.log(user);
        }
      }
    )
  }

  setPasswords(): void {
    for (const index of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      this.userService.update({id: index, password: 'test'}).subscribe(
        user => console.log(user)
      )
    }
  }

}
