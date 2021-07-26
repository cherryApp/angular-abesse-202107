import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UserComponent } from './page/user/user.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { NavComponent } from './common/nav/nav.component';
import { ConfigService } from './service/config.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    UserEditComponent,
    ForbiddenComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (service: ConfigService) => service.bootstrap(),
      deps: [ConfigService, HttpClient],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
