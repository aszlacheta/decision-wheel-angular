import { Component, OnInit } from '@angular/core';
import {
  MAX_OPTIONS_NUMBER,
  MIN_OPTIONS_NUMBER,
  OptionsService,
  WheelOptionList,
} from '../options.service';
import { MatFormField } from '@angular/material/form-field';
import { MatError, MatInput } from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { NgIf } from '@angular/common';

class CardTextareaValue extends Array<string> {
  private static Divider = '\n';

  constructor(...options: string[]) {
    super();
    this.push(...options);
  }

  public static parse(input: string): string[] {
    return input.split(CardTextareaValue.Divider);
  }

  public override toString() {
    return this.join(CardTextareaValue.Divider);
  }
}

interface CardTextareaFormValues {
  options: string | null;
}

@Component({
  selector: 'app-card-textarea',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatError,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    NgIf,
  ],
  templateUrl: './card-textarea.component.html',
  styleUrl: './card-textarea.component.less',
})
export class CardTextareaComponent implements OnInit {
  form = new FormGroup({
    options: new FormControl<CardTextareaValue>(
      {
        value: new CardTextareaValue(...['']),
        disabled: false,
      },
      {
        validators: control => ({
          min: control.value.length <= MIN_OPTIONS_NUMBER,
          max: control.value.length >= MAX_OPTIONS_NUMBER,
        }),
      }
    ),
  });

  constructor(private optionsService: OptionsService) {}

  ngOnInit() {
    this.optionsService
      .getOptions()
      .pipe(take(1))
      .subscribe((options: WheelOptionList) => {
        this.form.controls['options'].setValue(
          new CardTextareaValue(...options.toNames())
        );
      });
    this.optionsService.isSpinning.subscribe(isSpinning => {
      const enableOrDisableMethod: keyof AbstractControl = isSpinning
        ? 'disable'
        : 'enable';
      this.form.controls.options[enableOrDisableMethod]?.();
    });
    this.form.valueChanges.subscribe(formChanges => {
      this.onOptionsChange(formChanges as CardTextareaFormValues);
    });
  }

  private onOptionsChange(formChanges: CardTextareaFormValues): void {
    if (this.form.dirty && formChanges?.options !== null) {
      const textareaValue = new CardTextareaValue(
        ...CardTextareaValue.parse(formChanges?.options)
      );

      this.onValidation(textareaValue);

      this.optionsService.updateTitles(textareaValue);
      this.form.controls.options.setValue(
        new CardTextareaValue(...textareaValue),
        {
          emitEvent: false,
        }
      );
    }
  }

  private onValidation(textareaValue: CardTextareaValue): void {
    if (textareaValue && textareaValue.length > 0) {
      if (textareaValue.length > MAX_OPTIONS_NUMBER) {
        textareaValue.splice(
          MAX_OPTIONS_NUMBER,
          textareaValue.length - MAX_OPTIONS_NUMBER
        );
        this.form.controls.options.setErrors({ max: true });
      }
      if (textareaValue && textareaValue.length <= MIN_OPTIONS_NUMBER) {
        this.form.controls.options.setErrors({ min: true });
      }
    }
  }
}
