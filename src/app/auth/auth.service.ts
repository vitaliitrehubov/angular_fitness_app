import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Subject } from "rxjs";

import { AuthData } from "./models/auth-data.model";
import { User } from "./models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User = null;

  constructor(private router: Router) {}

  registerUser(data: AuthData) {
    this.user = {
      email: data.email,
      userId: String(Math.round(Math.random() * 1000))
    };

    this.authSuccessfully(true, ['training']);
  }

  login(data: AuthData) {
    this.user = {
      email: data.email,
      userId: String(Math.round(Math.random() * 1000))
    };

    this.authSuccessfully(true, ['training']);
  }

  logout() {
    this.user = null;
    this.authSuccessfully(false, ['login']);
  }

  getUser() {
    return JSON.parse(JSON.stringify(this.user));
  }

  isAuth() {
    return this.user !== null;
  }

  authSuccessfully(authStatus: boolean, redirectPath: string[]) {
    this.authChange.next(authStatus);
    this.router.navigate(redirectPath);
  }
}
