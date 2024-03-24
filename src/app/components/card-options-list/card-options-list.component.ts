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
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { CardTextareaComponent } from '../card-textarea/card-textarea.component';
import { Observable } from 'rxjs';
import { WheelOption } from '../wheel-option/wheel-option';
import {
  MAX_OPTIONS_NUMBER,
  OptionsService,
} from '../../services/options.service';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { CardOptionAdvancedComponent } from '../advanced-view/card-option-advanced/card-option-advanced.component';
import { CardOptionsAdvancedListComponent } from '../advanced-view/card-options-advanced-list/card-options-advanced-list.component';
import { CardOptionAdvancedAddComponent } from '../advanced-view/card-option-advanced-add/card-option-advanced-add.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-card-options-list',
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
    CardTextareaComponent,
    NgForOf,
    CommonModule,
    FormsModule,
    MatCheckbox,
    CardOptionAdvancedComponent,
    CardOptionsAdvancedListComponent,
    CardOptionAdvancedAddComponent,
    MatIconButton,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './card-options-list.component.html',
  styleUrl: './card-options-list.component.less',
})
export class CardOptionsListComponent implements OnInit {
  options: Observable<WheelOption[]>;

  isAddDisabled: boolean = false;
  isAdvancedOn: boolean = false;

  constructor(protected optionsService: OptionsService) {}

  ngOnInit() {
    this.options = this.optionsService.options;

    this.options.subscribe(options => {
      this.isAddDisabled = options.length >= MAX_OPTIONS_NUMBER;
    });
  }

  onShuffle() {
    this.optionsService.shuffle();
  }
}
