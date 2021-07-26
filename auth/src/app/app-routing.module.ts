import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
