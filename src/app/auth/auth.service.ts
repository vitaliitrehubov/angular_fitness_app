import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  authChange = new Subject<boolean>();

  private user: User;

  registerUser(data: AuthData) {
    this.user = {
      email: data.email,
      userId: String(Math.round(Math.random() * 1000))
    };
    this.authChange.next(true);
  }

  login(data: AuthData) {
    this.user = {
      email: data.email,
      userId: String(Math.round(Math.random() * 1000))
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return JSON.parse(JSON.stringify(this.user));
  }

  isAuth() {
    return this.user !== null;
  }
}
