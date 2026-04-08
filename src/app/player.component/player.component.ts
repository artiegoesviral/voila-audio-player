import { Component, ChangeDetectorRef } from '@angular/core';
import { AudioService } from '../services/audio.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  constructor(public audio: AudioService, private cd: ChangeDetectorRef) {
    // Optional: force view update on each tick
    setInterval(() => {
      this.cd.detectChanges();
    }, 250); // every 250ms
  }

  selectMood(mood: string) {
    this.audio.loadPlaylist(mood);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}