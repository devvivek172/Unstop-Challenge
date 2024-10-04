import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  numSeats: number = 1;
  rows: number = 12;
  columns: number = 7;
  lastRowSeats: number = 3;
  seats: number[][] = [];
  errorMessage: string = '';

  constructor() {
    this.initializeSeats();
  }

  initializeSeats() {
    for (let i = 0; i < this.rows - 1; i++) {
      this.seats.push(new Array(this.columns).fill(0));
    }
    this.seats.push(new Array(this.lastRowSeats).fill(0));
  }

  displaySeats(): string {
    return this.seats
      .map((row) => row.map((seat) => (seat === 0 ? '0' : 'X')).join(' '))
      .join('\n');
  }

  bookSeats() {
    this.errorMessage = '';

    if (this.numSeats < 1 || this.numSeats > 7) {
      this.errorMessage =
        'You can book a minimum of 1 seat and a maximum of 7 seats at a time.';
      return;
    }

    if (!this.tryBookSeatsInOneRow()) {
      this.bookNearbySeats(this.numSeats);
    }
  }

  tryBookSeatsInOneRow(): boolean {
    for (let row of this.seats) {
      let availableSeats = row.filter((seat) => seat === 0).length;
      if (availableSeats >= this.numSeats) {
        for (let i = 0; i < row.length; i++) {
          if (row[i] === 0) {
            row[i] = 1;
            this.numSeats -= 1;
            if (this.numSeats === 0) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  bookNearbySeats(numSeats: number) {
    for (let row of this.seats) {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 0) {
          row[i] = 1;
          numSeats -= 1;
          if (numSeats === 0) {
            return;
          }
        }
      }
    }
    this.errorMessage = 'Not enough seats available.';
  }
}
