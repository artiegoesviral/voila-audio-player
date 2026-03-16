export interface Song {
    title: string;
    path: string;
    artwork: string;
}

export interface Playlist {
    mood: string;
    songs: Song[];
}
