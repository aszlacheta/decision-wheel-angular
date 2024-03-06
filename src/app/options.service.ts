import { Injectable } from '@angular/core';
import { WheelOption } from './wheel-option/wheel-option';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';

export const MIN_OPTIONS_NUMBER = 2;
export const MAX_OPTIONS_NUMBER = 10;

export const DEFAULT_OPTIONS = [
  { id: 1, title: 'first' },
  { id: 2, title: 'second' },
  { id: 3, title: 'third' },
  { id: 4, title: 'fourth' },
];

export class WheelOptionList extends Array<WheelOption> {
  constructor(...options: WheelOption[]) {
    super();
    this.push(...options);
  }

  public override toString(): string {
    return this.map(option => option.title).join('\n');
  }

  public toNames(): string[] {
    return this.map(option => option.title);
  }
}

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  options: Subject<WheelOptionList> = new BehaviorSubject<WheelOptionList>(
    new WheelOptionList(...DEFAULT_OPTIONS)
  );
  isTooLow: boolean = false;
  isTooHigh: boolean = false;
  isDisabled: Subject<boolean> = new BehaviorSubject<boolean>(false);

  isSpinning: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.options.subscribe((current: WheelOptionList) => {
      this.isTooLow = current.length < MIN_OPTIONS_NUMBER;
      this.isTooHigh = current.length > MAX_OPTIONS_NUMBER;

      this.isDisabled.next(this.isTooLow || this.isTooHigh);
    });
  }

  getOptions(): Observable<WheelOptionList> {
    return this.options;
  }

  updateTitles(titles: string[]) {
    this.options.pipe(take(1)).subscribe(current => {
      const wheelOptions: WheelOption[] = titles
        .filter(title => title.length > 0)
        .filter((title, index) => index < MAX_OPTIONS_NUMBER)
        .map((title, index) => ({
          title,
          id: current[index]?.id ?? index + 1,
        }));
      this.options.next(new WheelOptionList(...wheelOptions));
    });
  }

  addOption(optionTitle: WheelOption['title']): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      const newOption: WheelOption = {
        id: current.length + 1,
        title: optionTitle,
      };
      this.options.next(new WheelOptionList(...current, newOption));
    });
  }

  removeOption(index: number): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      current.splice(index, 1);
      this.options.next(current);
    });
  }

  startSpin(): void {
    this.isSpinning.next(true);
  }

  endSpin(): void {
    this.isSpinning.next(false);
  }
}
