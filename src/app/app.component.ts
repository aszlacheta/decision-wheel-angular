import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheelComponent } from './wheel/wheel.component';
import { OptionsListComponent } from './options-list/options-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WheelComponent, OptionsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'decision-wheel-angular';
}
