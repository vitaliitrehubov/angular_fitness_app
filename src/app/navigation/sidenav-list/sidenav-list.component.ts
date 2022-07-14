import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { navLinks } from '../../constants';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  navLinks = navLinks;

  constructor() { }

  onCloseSidenav() {
    this.sidenavClose.emit();
  }

  ngOnInit(): void {
  }

}
