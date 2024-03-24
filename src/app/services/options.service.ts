import { Injectable } from '@angular/core';
import { WheelOption } from '../components/wheel-option/wheel-option';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';

export const MIN_OPTIONS_NUMBER = 2;
export const MAX_OPTIONS_NUMBER = 10;

export class WheelOptionList extends Array<WheelOption> {
  static DEFAULT_NEW_OPTION_TITLE = $localize`:new-option-title:New`;

  static DEFAULT_OPTIONS: WheelOption[] = [
    { title: $localize`:first-default-option-label:pizza` },
    { title: $localize`:second-default-option-label:pasta` },
    { title: $localize`:third-default-option-label:ramen` },
    { title: $localize`:fourth-default-option-label:sushi` },
  ];

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
    new WheelOptionList(...WheelOptionList.DEFAULT_OPTIONS)
  );
  isTooLow: boolean = false;
  isTooHigh: boolean = false;
  isDisabled: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isAddDisabled: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isRemoveDisabled: Subject<boolean> = new BehaviorSubject<boolean>(false);

  isSpinning: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.options.subscribe((current: WheelOptionList) => {
      this.isTooLow = current.length < MIN_OPTIONS_NUMBER;
      this.isTooHigh = current.length > MAX_OPTIONS_NUMBER;

      this.isDisabled.next(this.isTooLow || this.isTooHigh);
      this.isAddDisabled.next(current.length >= MAX_OPTIONS_NUMBER);
      this.isRemoveDisabled.next(current.length <= MIN_OPTIONS_NUMBER);
    });
  }

  getOptions(): Observable<WheelOptionList> {
    return this.options;
  }

  updateTitles(titles: string[]) {
    const wheelOptions: WheelOption[] = titles
      .filter(title => title.length > 0)
      .filter((title, index) => index < MAX_OPTIONS_NUMBER)
      .map(title => ({
        title,
      }));
    this.options.next(new WheelOptionList(...wheelOptions));
  }

  addOption(optionTitle?: WheelOption['title']): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      const newOption: WheelOption = {
        title: optionTitle ?? WheelOptionList.DEFAULT_NEW_OPTION_TITLE,
      };
      this.options.next(new WheelOptionList(...current, newOption));
    });
  }

  removeOption(index: number): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      current.splice(index, 1);
      current.map((option, index) => ({ ...option, index }));
      const newOptions = current.map(option => ({
        ...option,
      }));
      this.options.next(new WheelOptionList(...newOptions));
    });
  }

  renameOption(index: number, title: WheelOption['title']): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      current[index].title = title;
      this.options.next(current);
    });
  }

  duplicate(index: number) {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      if (current.length < MAX_OPTIONS_NUMBER) {
        current.splice(index, 0, { ...current[index] });
        this.options.next(current);
      }
    });
  }

  startSpin(): void {
    this.isSpinning.next(true);
  }

  endSpin(): void {
    this.isSpinning.next(false);
  }
}
