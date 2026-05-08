import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Song {
  audio_path: string;
  title: string;
  path: string;
  artwork: string;
}

export interface Playlist {
  mood: string;
  songs: Song[];
}

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio = new Audio();

  currentPlaylist: Playlist | null = null;
  currentSong: Song | null = null;

  currentTime = 0;
  duration = 0;

  private index = 0;

  playlists: Playlist[] = [];

  constructor(private zone: NgZone, private http: HttpClient) {
    this.loadPlaylistsFromDatabase();
    this.audio.addEventListener('loadedmetadata', () => {
      this.zone.run(() => {
        this.duration = this.audio.duration || 0;
      });
    });

    setInterval(() => {
      if (this.currentSong) {
        this.zone.run(() => {
          this.currentTime = this.audio.currentTime;
          this.duration = this.audio.duration || 0;
        });
      }
    }, 200);

    this.audio.addEventListener('ended', () => this.next());
  }
  loadPlaylistsFromDatabase() {
    this.http.get<Playlist[]>('https://voila-player-backend.onrender.com/api/playlists')
      .subscribe({
        next: (data) => {
          this.playlists = data;
          console.log('Loaded playlists:', data);
        },
        error: (err) => {
          console.error('Failed to load playlists:', err);
        }
      });
  }

  loadPlaylist(mood: string) {
    this.currentPlaylist = this.playlists.find(p => p.mood === mood) || null;
    if (!this.currentPlaylist || this.currentPlaylist.songs.length === 0) return;

    this.index = 0;
    this.loadSong();
  }

  private loadSong() {
    if (!this.currentPlaylist) return;

    const song = this.currentPlaylist.songs[this.index];

    console.log('Selected song:', song);
    console.log('audio_path:', song.audio_path);

    if (!song?.audio_path) {
      console.error('Missing audio_path:', song);
      return;
    }

    this.audio.pause();

    this.currentSong = song;
    this.currentTime = 0;

    const BASE = 'https://artiegoesviral.github.io/voila-audio-player/';

    this.audio.src = song.audio_path.startsWith('http')
      ? song.audio_path
      : BASE + song.audio_path;

    console.log('Final audio src:', this.audio.src);

    this.audio.currentTime = 0;
    this.audio.load();
  }

  play() { this.audio.play().catch(err => console.warn(err)); }
  pause() { this.audio.pause(); }

  next() {
    if (!this.currentPlaylist) return;
    this.index = (this.index + 1) % this.currentPlaylist.songs.length;
    this.loadSong();
    this.play();
  }

  previous() {
    if (!this.currentPlaylist) return;
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    this.index = (this.index - 1 + this.currentPlaylist.songs.length) % this.currentPlaylist.songs.length;
    this.loadSong();
    this.play();
  }

  seek(time: number) { this.audio.currentTime = time; }
}