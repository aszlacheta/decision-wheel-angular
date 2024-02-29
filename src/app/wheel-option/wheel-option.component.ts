import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-wheel-option',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './wheel-option.component.html',
  styleUrl: './wheel-option.component.less',
})
export class WheelOptionComponent {
  @Input() id: number;
  @Input() title: string;
  @Input() optionsSize: number;

  @Input() backgroundColor?: string | undefined;
  @Input() textColor?: string | undefined;

  get angle(): number {
    return 360 / this.optionsSize;
  }

  get rotateValue(): number {
    return (this.id - 1) * this.angle;
  }

  get skewValue(): number {
    return 90 - this.angle;
  }
}
