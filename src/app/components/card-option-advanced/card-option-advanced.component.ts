import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import {
  MIN_OPTIONS_NUMBER,
  OptionsService,
} from '../../services/options.service';

@Component({
  selector: 'app-card-option-advanced',
  standalone: true,
  imports: [MatIcon, MatMiniFabButton],
  templateUrl: './card-option-advanced.component.html',
  styleUrl: './card-option-advanced.component.less',
})
export class CardOptionAdvancedComponent implements OnInit {
  @Input() index: number;
  @Input() title: string;

  isRemoveDisabled: boolean = false;

  constructor(private optionsService: OptionsService) {}

  ngOnInit() {
    this.optionsService.getOptions().subscribe(options => {
      this.isRemoveDisabled = options.length <= MIN_OPTIONS_NUMBER;
    });
  }

  onRemove(): void {
    this.optionsService.removeOption(this.index);
  }
}
