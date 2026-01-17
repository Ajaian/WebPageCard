
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BirthdayWishComponent } from './birthday-wish/birthday-wish.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BirthdayWishComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('WebPageCard');
}
