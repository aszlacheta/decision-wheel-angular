import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {WheelOption} from "../wheel-option/wheel-option";
import {WheelOptionComponent} from "../wheel-option/wheel-option.component";

const DEFAULT_COLORS = ['#cc1616', 'beige'];
const DEFAULT_TEXT_COLORS = ['white', '#cc1616'];

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [
    NgForOf,
    WheelOptionComponent
  ],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.less'
})
export class WheelComponent {
  circles: undefined[] = Array.from(Array(20));

  options: WheelOption[] = [
    {id: 1, title: 'first'},
    {id: 2, title: 'second'},
    {id: 3, title: 'third'},
    {id: 4, title: 'fourth'},
    {id: 5, title: 'fifth'},
    {id: 6, title: 'sixth'},
    {id: 7, title: 'seventh'},
    {id: 8, title: 'eighth'},
    {id: 9, title: 'ninth'},
    {id: 10, title: 'tenth'},
    {id: 11, title: 'eleventh'},
    {id: 12, title: 'twelve'},
    {id: 13, title: 'thirteenth'},
    {id: 14, title: 'fourteenth'},
  ].map((option, index) => ({
    ...option,
    color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    textColor: DEFAULT_TEXT_COLORS[index % DEFAULT_TEXT_COLORS.length]
  }))
}
