import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { OptionComponent } from '../option/option.component';
import { Observable } from 'rxjs';
import { WheelOption } from '../wheel-option/wheel-option';
import { OptionsService } from '../options.service';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

const MAX_OPTIONS_NUMBER = 10;

@Component({
  selector: 'app-options-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardContent,
    MatCardFooter,
    MatDivider,
    MatProgressBar,
    MatFormField,
    MatInput,
    MatLabel,
    OptionComponent,
    NgForOf,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './options-list.component.html',
  styleUrl: './options-list.component.less',
})
export class OptionsListComponent implements OnInit {
  options: Observable<WheelOption[]>;
  newOptionTitle: string = 'test';
  isAddDisabled: boolean = false;

  constructor(private optionsService: OptionsService) {}

  ngOnInit() {
    this.options = this.optionsService.getOptions();

    this.options.subscribe(options => {
      this.isAddDisabled = options.length >= MAX_OPTIONS_NUMBER;
    });
  }

  addOption() {
    this.optionsService.addOption(this.newOptionTitle);
  }
}
