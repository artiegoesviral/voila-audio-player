import { Component, signal } from '@angular/core';
import { PlayerComponent } from "./player.component/player.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('voila-player');
}
