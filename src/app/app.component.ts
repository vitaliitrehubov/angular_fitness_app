import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  myCustomEvent(msg: string) {
    console.log('emitted some event', msg)
  }

  constructor() {
    //setTimeout(() => this.isFooterShown = false, 2000)
  }
}
