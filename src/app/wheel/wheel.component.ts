import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { WheelOptionComponent } from '../wheel-option/wheel-option.component';
import { Observable } from 'rxjs';
import { WheelOption } from '../wheel-option/wheel-option';
import { OptionsService } from '../options.service';

const ROTATION_DEGREES_MIN: number = 1500;
const ROTATION_DEGREES_MAX: number = 2500;
const SPIN_TIMEOUT_MS = 5000;

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, NgForOf, WheelOptionComponent],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.less',
})
export class WheelComponent implements OnInit {
  circles: undefined[] = Array.from(Array(20));
  options: Observable<WheelOption[]>;
  isDisabled: boolean;

  rotationDegrees: number = 0;

  constructor(private optionsService: OptionsService) {}

  get rotationRandomDegrees() {
    const min = Math.ceil(ROTATION_DEGREES_MIN);
    const max = Math.floor(ROTATION_DEGREES_MAX);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit() {
    this.options = this.optionsService.getOptions();
    this.optionsService.isDisabled.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });
  }

  onSpin(): void {
    if (!this.isDisabled) {
      this.rotationDegrees += this.rotationRandomDegrees;
      this.optionsService.startSpin();

      setTimeout(() => {
        this.optionsService.endSpin();
      }, SPIN_TIMEOUT_MS);
    }
  }
}
