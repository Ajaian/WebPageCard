
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-birthday-wish',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './birthday-wish.component.html',
  styleUrls: ['./birthday-wish.component.css']
})
export class BirthdayWishComponent implements OnInit, OnDestroy {
     constructor(private cdr: ChangeDetectorRef) {}
  // App states: 'loading', 'countdown', 'reveal', 'opened'
  state: 'loading' | 'countdown' | 'reveal' | 'opened' = 'loading';

  // Set your birthday date here (YYYY-MM-DDTHH:MM:SS)
  birthday: Date = new Date('2026-01-20T00:00:00');
  now: Date = new Date();
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  intervalId: any;
  loadingTimeout: any;
  cardOpened = false;

  heartfeltMessage = `Wishing the sweetest, cutest, most wonderful person the happiest birthday! 💖\nMay your day be filled with love, laughter, and all your favorite things.\nYou are truly special and loved beyond words.\nHappy Birthday, Cutiepie! 🎂✨💕`;

  ngOnInit() {
    // Show loading for 2.5s, then start countdown
    this.loadingTimeout = setTimeout(() => {
        this.state = 'countdown';
        this.cdr.detectChanges();
        this.startCountdown();
    }, 2500);
  }

  ngOnDestroy() {
    clearTimeout(this.loadingTimeout);
    clearInterval(this.intervalId);
  }

  startCountdown() {
    this.updateCountdown();
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    this.now = new Date();
    const diff = this.birthday.getTime() - this.now.getTime();
    if (diff <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.intervalId);
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      this.countdown = { days, hours, minutes, seconds };
    }
  }

  onReveal() {
    this.state = 'reveal';
  }

  openCard() {
    if (!this.cardOpened){
      this.cardOpened = true;
      this.state = 'opened';
    }
    else {
    this.cardOpened = false;
    this.state = 'reveal';
    }
  }

  isCountdownZero() {
    return (
      this.countdown.days === 0 &&
      this.countdown.hours === 0 &&
      this.countdown.minutes === 0 &&
      this.countdown.seconds === 0
    );
  }
}
