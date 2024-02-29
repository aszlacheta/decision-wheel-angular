import { Injectable } from '@angular/core';
import { WheelOption } from './wheel-option/wheel-option';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  options: Subject<WheelOption[]> = new BehaviorSubject<WheelOption[]>([
    { id: 1, title: 'first' },
    { id: 2, title: 'second' },
    { id: 3, title: 'third' },
    { id: 4, title: 'fourth' },
  ]);

  constructor() {}

  getOptions(): Observable<WheelOption[]> {
    return this.options;
  }

  addOption(optionTitle: WheelOption['title']): void {
    // TODO types
    this.options.pipe(take(1)).subscribe(current => {
      const newOption: WheelOption = {
        id: current.length + 1,
        title: optionTitle,
      };
      this.options.next([...current, newOption]);
    });
  }

  removeOption(index: number): void {
    // TODO types
    this.options.pipe(take(1)).subscribe(current => {
      current.splice(index, 1);
      this.options.next(current);
    });
  }
}
