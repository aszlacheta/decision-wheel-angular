import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

const DEFAULT_COLORS = ['#cc1616', 'beige'];
const DEFAULT_TEXT_COLORS = ['white', '#cc1616'];

@Component({
  selector: 'app-wheel-option',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './wheel-option.component.html',
  styleUrl: './wheel-option.component.less',
})
export class WheelOptionComponent {
  @Input() index: number;
  @Input() title: string;
  @Input() optionsSize: number;

  @Input() backgroundColor?: string | undefined;
  @Input() textColor?: string | undefined;

  get angle(): number {
    return 360 / this.optionsSize;
  }

  get rotateValue(): number {
    return this.index * this.angle;
  }

  get skewValue(): number {
    return 90 - this.angle;
  }

  get defaultBackgroundColor(): string {
    return DEFAULT_COLORS[this.index % DEFAULT_COLORS.length];
  }

  get defaultTextColor(): string {
    return DEFAULT_TEXT_COLORS[this.index % DEFAULT_TEXT_COLORS.length];
  }
}
