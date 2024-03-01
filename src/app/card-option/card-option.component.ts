import { Component, Input, OnInit } from '@angular/core';
import { OptionsService } from '../options.service';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

const MIN_OPTIONS_NUMBER = 2;

@Component({
  selector: 'app-card-option',
  standalone: true,
  imports: [MatIcon, MatMiniFabButton],
  templateUrl: './card-option.component.html',
  styleUrl: './card-option.component.less',
})
export class CardOptionComponent implements OnInit {
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
