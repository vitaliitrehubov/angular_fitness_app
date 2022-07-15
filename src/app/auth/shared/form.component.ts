import { Component, EventEmitter, ViewChild, Input, Output } from "@angular/core";
import { NgForm } from '@angular/forms';

import { AuthData } from '../models/auth-data.model';

@Component({
  selector: 'app-form',
  template: `
  <form
    (ngSubmit)="onSubmit()"
    fxLayout="column"
    fxLayoutGap="6px"
    fxLayoutAlign="center center"
    #form="ngForm"
  >
    <mat-form-field appearance="fill">
      <mat-label>Email</mat-label>
      <input
        matInput
        type="email"
        name="email"
        required
        email
        ngModel
        #email="ngModel"
      />
      <mat-error *ngIf="email.hasError('email')">Invalid Email!</mat-error>
      <mat-error *ngIf="email.hasError('required')">
        Email is required!
      </mat-error>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Password</mat-label>
      <input
        matInput
        type="password"
        name="password"
        required
        minlength="6"
        ngModel

        #password="ngModel"
      />
      <!-- pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$" -->
      <mat-error *ngIf="password.hasError('pattern')">pattern is wrong!</mat-error>
      <mat-error *ngIf="password.hasError('required')">
        Password is required!
      </mat-error>
      <mat-error *ngIf="password.hasError('minlength')">
        Min password length - 6 characters!
      </mat-error>
    </mat-form-field>

    <mat-checkbox *ngIf="formType === 'signup'" name="agreement" ngModel required>
      Agree to terms and conditions.
    </mat-checkbox>

    <button
      *ngIf="!isLoading"
      mat-raised-button
      color="primary"
      type="submit"
      [disabled]="form.invalid"
    >
      Submit
    </button>
    <mat-spinner *ngIf="isLoading"></mat-spinner>
  </form>
  `
})
export class AppForm {
  @Input('formType') formType: 'login' | 'signup' = 'login';
  @Input('isLoading') isLoading: boolean = false;
  @Output() formSubmit = new EventEmitter<AuthData>();

  @ViewChild('form') form: NgForm;

  onSubmit() {
    this.formSubmit.emit(this.form.value);
  }
}
