import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth: boolean;

  constructor(
    private authService: AuthService
  ) { }

  onLogout() {
    this.authService.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (data: boolean) => {
        console.log('isAuth: ', data);
        this.isAuth = data;
      }
    );
  }

  ngOnDestroy() {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
