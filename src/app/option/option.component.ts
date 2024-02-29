import { Component, Input } from '@angular/core';
import { OptionsService } from '../options.service';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.less',
})
export class OptionComponent {
  @Input() index: number;
  @Input() title: string;

  constructor(private optionsService: OptionsService) {}

  onRemove(): void {
    this.optionsService.removeOption(this.index);
  }
}
