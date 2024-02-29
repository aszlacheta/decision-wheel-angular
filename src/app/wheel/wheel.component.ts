import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { WheelOptionComponent } from '../wheel-option/wheel-option.component';
import { Observable } from 'rxjs';
import { WheelOption } from '../wheel-option/wheel-option';
import { OptionsService } from '../options.service';

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

  constructor(private optionsService: OptionsService) {}

  ngOnInit() {
    this.options = this.optionsService.getOptions();
  }
}
