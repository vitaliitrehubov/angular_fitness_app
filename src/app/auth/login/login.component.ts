import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { AuthData } from '../models/auth-data.model';

@Component({
  selector: 'app-login',
  template: `
    <section>
      <h2>Login Form</h2>
      <app-form (formSubmit)="onFormSubmit($event)" formType="login"></app-form>
    </section>
  `,
  styles: [`
    h2 {
      text-align: center;
    }
  `]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(data: AuthData) {

    console.log('loggin in... ', data);
    this.authService.login(data);
  }

}
