import { Injectable } from '@angular/core';
import { WheelOption } from './wheel-option/wheel-option';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private options: WheelOption[] = [
    { id: 1, title: 'first' },
    { id: 2, title: 'second' },
    { id: 3, title: 'third' },
    { id: 4, title: 'fourth' },
  ];

  constructor() {}

  getOptions(): Observable<WheelOption[]> {
    return of(this.options);
  }

  addOption(optionTitle: WheelOption['title']): void {
    // TODO types
    const newOption: WheelOption = {
      id: this.options.length + 1,
      title: optionTitle,
    };
    this.options.push(newOption);
  }

  removeOption(index: number): void {
    // TODO types
    this.options.splice(index, 1);
  }
}
