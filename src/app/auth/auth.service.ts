import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthData } from "./models/auth-data.model";
import { TrainingService } from "../training/training.service";
import { UIService } from "./ui.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  authChange = new Subject<boolean>();
  private userAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private snackbar: MatSnackBar
  ) { }

  async registerUser(authData: AuthData) {
    try {
      this.uiService.loadingStateChanged.next(true);
      await this.fireAuth.createUserWithEmailAndPassword(
        authData.email, authData.password
      );
    } catch (error) {
      this.snackbar.open(error.message, null, { duration: 5000 });
    } finally {
      this.uiService.loadingStateChanged.next(false);
    }
  }

  async login(authData: AuthData) {
    try {
      this.uiService.loadingStateChanged.next(true);
      await this.fireAuth.signInWithEmailAndPassword(
        authData.email, authData.password
      );
    } catch (error) {
      this.snackbar.open(error.message, null, { duration: 5000 });
    } finally {
      this.uiService.loadingStateChanged.next(false);
    }
  }

  logout() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.userAuthenticated;
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['training']);
      } else {
        this.userAuthenticated = false;
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['login']);
      }
    });
  }
}
