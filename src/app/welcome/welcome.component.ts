import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  styles: [`.home-page { text-align: center }`],
  template: `
    <div class="home-page" fxLayoutAlign="center center">
      <section>
        <h3>Activity</h3>
        <p>Stay active and enjoy better health and more fun!</p>
      </section>
      <section>
        <h3>Community</h3>
        <p>Get to know other people who share your passion.</p>
      </section>
      <section>
        <h3>Challenges</h3>
        <p>Never stop! Dive into new challenges every day.</p>
      </section>
    </div>
  `
})
export class WelcomeComponent { }
