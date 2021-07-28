import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList$: Observable<User[]> = this.userService.getAll();
  roleNames: string[] = ['visitor', 'viewer', 'editor', 'admin'];
  searchPhrase: string = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  getRoleName(roleID: number | undefined): string {
    return roleID ? this.roleNames[roleID] : this.roleNames[0];
  }

  fibonacci(num: number): number {
    if (num <= 1) {
      return 1;
    }

    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }

}
