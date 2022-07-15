import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { AuthData } from '../models/auth-data.model';
import { UIService } from '../ui.service';

@Component({
  selector: 'app-login',
  template: `
    <section>
      <h2>Login Form</h2>
      <app-form
        (formSubmit)="onFormSubmit($event)"
        [isLoading]="isLoading"
        formType="login"
      ></app-form>
    </section>
  `
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(
    private uiService: UIService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loadingState: boolean) => this.isLoading = loadingState
    );
  }

  onFormSubmit(data: AuthData) {
    this.authService.login(data);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
