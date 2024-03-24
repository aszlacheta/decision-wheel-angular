import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheelComponent } from './components/wheel/wheel.component';
import { CardOptionsListComponent } from './components/card-options-list/card-options-list.component';
import { MuteToggleComponent } from './components/mute-toggle/mute-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WheelComponent,
    CardOptionsListComponent,
    MuteToggleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'decision-wheel-angular';
}
