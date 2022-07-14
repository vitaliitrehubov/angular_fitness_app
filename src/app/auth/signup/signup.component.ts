import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
