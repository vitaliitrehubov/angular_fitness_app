import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth: boolean;

  constructor(
    private authService: AuthService
  ) { }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }

  onCloseSidenav() {
    this.sidenavClose.emit();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (data: boolean) => this.isAuth = data
    );
  }

  ngOnDestroy() {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
