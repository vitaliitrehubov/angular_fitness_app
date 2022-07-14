import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthData } from '../models/auth-data.model';

@Component({
  selector: 'app-signup',
  template: `
    <section>
      <h2>Signup Form</h2>
      <app-form (formSubmit)="onFormSubmit($event)" formType="signup"></app-form>
    </section>
  `,
  styles: [`
    mat-form-field {
      width: 300px;
    }
    h2 {
      text-align: center;
    }
  `]
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }



  onFormSubmit(formData: AuthData) {
    console.log('singing up... ', formData);
    const { email, password } = formData;
    this.authService.registerUser({ email, password });
  }

  ngOnInit() {
  }

}
