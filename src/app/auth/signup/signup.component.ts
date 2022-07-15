import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { AuthData } from '../models/auth-data.model';
import { UIService } from '../ui.service';

@Component({
  selector: 'app-signup',
  template: `
    <section>
      <h2>Signup Form</h2>
      <app-form
        (formSubmit)="onFormSubmit($event)"
        [isLoading]="isLoading"
        formType="signup"
      ></app-form>
    </section>
  `
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(
    private uiService: UIService,
    private authService: AuthService
  ) { }

  onFormSubmit(formData: AuthData) {
    const { email, password } = formData;
    this.authService.registerUser({ email, password });
  }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loadingState: boolean) => this.isLoading = loadingState
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
