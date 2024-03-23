import { Injectable } from '@angular/core';
import { SPIN_TIMEOUT_MS } from './wheel/wheel.component';

const TICK_START_TIMEOUT = 500;
const TICK_START_DIFF = 200;

@Injectable({
  providedIn: 'root',
})
export class TickSoundService {
  tickSound = new Audio('../../assets/tick.mp3');

  timeout: ReturnType<typeof setTimeout>;

  constructor() {}

  start() {
    let time = TICK_START_TIMEOUT;

    this.tickSound.play();

    const loopFaster = () => {
      time -= TICK_START_DIFF;
      this.tickSound.play();
      this.timeout = setTimeout(loopFaster, time);
    };
    this.timeout = setTimeout(loopFaster, time);

    setTimeout(() => {
      clearTimeout(this.timeout);
    }, SPIN_TIMEOUT_MS - 300);
  }
}
