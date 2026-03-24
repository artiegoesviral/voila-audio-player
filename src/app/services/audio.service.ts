import { Injectable, NgZone } from '@angular/core';

export interface Song {
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

  playlists: Playlist[] = [
    {
      mood: 'angry',
      songs: [
        {
          title: 'Dead to Me',
          path: 'assets/music/angry/dead-to-me.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Cursive (with Kellin Quinn)',
          path: 'assets/music/angry/cursive.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Digital Zombies',
          path: 'assets/music/angry/digital-zombies.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'FMK!',
          path: 'assets/music/angry/fmk.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'All Sales Are Final (with Lauren Sanderson)',
          path: 'assets/music/angry/all-sales-are-final.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Don\'t Say I Didn\'t Warn You (with Craig Owens)',
          path: 'assets/music/angry/dont-say-i-didnt-warn-you.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Playing Dead',
          path: 'assets/music/angry/playing-dead.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'THE LAST LAUGH!',
          path: 'assets/music/angry/the-last-laugh.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Wish You Hell',
          path: 'assets/music/angry/wish-you-hell.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Moat',
          path: 'assets/music/angry/moat.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Wish It On You (with AViVA)',
          path: 'assets/music/angry/wish-it-on-you.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Table For One',
          path: 'assets/music/angry/table-for-one.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Voodoo',
          path: 'assets/music/angry/voodoo.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Happy Never After',
          path: 'assets/music/angry/happy-never-after.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        }
      ]
    },
    {
      mood: 'ecstatic & hopeful',
      songs: [
        {
          title: 'So Hot That It Hurts',
          path: 'assets/music/ecstatic-hopeful/so-hot-that-it-hurts.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Out The Blue (with Marlhy)',
          path: 'assets/music/ecstatic-hopeful/out-the-blue.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'We Could Be The Future (with The Ready Set)',
          path: 'assets/music/ecstatic-hopeful/we-could-be-the-future.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Hope That I Go First',
          path: 'assets/music/ecstatic-hopeful/hope-that-i-go-first.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Drop Dead Gorgeous',
          path: 'assets/music/ecstatic-hopeful/drop-dead-gorgeous.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'TIC TAC TOE',
          path: 'assets/music/ecstatic-hopeful/tic-tac-toe.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Crybaby (with phem)',
          path: 'assets/music/ecstatic-hopeful/crybaby.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'MATH',
          path: 'assets/music/ecstatic-hopeful/math.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'My Type',
          path: 'assets/music/ecstatic-hopeful/my-type.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'LIFEBLOOD',
          path: 'assets/music/ecstatic-hopeful/lifeblood.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'It\'s Got A Ring To It',
          path: 'assets/music/ecstatic-hopeful/its-got-a-ring-to-it.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Better Off',
          path: 'assets/music/ecstatic-hopeful/better-off.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'One Foot Out The Door',
          path: 'assets/music/ecstatic-hopeful/one-foot-out-the-door.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Dancing On Our Graves',
          path: 'assets/music/ecstatic-hopeful/dancing-on-our-graves.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'School Night',
          path: 'assets/music/ecstatic-hopeful/school-night.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Kiss & Tell A Phone',
          path: 'assets/music/ecstatic-hopeful/kiss-and-tell-a-phone.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Lie With Me (with NERIAH)',
          path: 'assets/music/ecstatic-hopeful/lie-with-me.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'WAR.',
          path: 'assets/music/ecstatic-hopeful/war.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'VOGUE',
          path: 'assets/music/ecstatic-hopeful/vogue.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Heartbreak Hotline',
          path: 'assets/music/ecstatic-hopeful/heartbreak-hotline.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        }
      ]
    },
    {
      mood: 'heartbroken',
      songs: [
        {
          title: 'MAKE BELIEVE',
          path: 'assets/music/heartbroken/make-believe.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Get A Room (with Megan Cromwell)',
          path: 'assets/music/heartbroken/get-a-room.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Hush Now',
          path: 'assets/music/heartbroken/hush-now.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Cruel',
          path: 'assets/music/heartbroken/cruel.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        },
        {
          title: 'Colourblind',
          path: 'assets/music/heartbroken/colourblind.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'I Hope That It\'s Fatal',
          path: 'assets/music/heartbroken/i-hope-that-its-fatal.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: '4GET',
          path: 'assets/music/heartbroken/4get.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        },
        {
          title: 'Right For Us',
          path: 'assets/music/heartbroken/right-for-us.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        },
        {
          title: 'Petals',
          path: 'assets/music/heartbroken/petals.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Nevergreen (with Kellin Quinn)',
          path: 'assets/music/heartbroken/nevergreen.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Ballerina (with The Word Alive)',
          path: 'assets/music/heartbroken/ballerina.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Therapy',
          path: 'assets/music/heartbroken/therapy.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Nothing - Stripped',
          path: 'assets/music/heartbroken/nothing-stripped.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        },
        {
          title: 'At Second Thought',
          path: 'assets/music/heartbroken/at-second-thought.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'If You Were Me',
          path: 'assets/music/heartbroken/if-you-were-me.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        }
      ]
    },
    {
      mood: 'lonely',
      songs: [
        {
          title: 'Good Grief',
          path: 'assets/music/lonely/good-grief.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'No Lullaby',
          path: 'assets/music/lonely/no-lullaby.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'WHERE THE STATUES BREATHE',
          path: 'assets/music/lonely/where-the-statues-breathe.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Better Than Me',
          path: 'assets/music/lonely/better-than-me.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Dotted Line',
          path: 'assets/music/lonely/dotted-line.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'The Cure For Breathing',
          path: 'assets/music/lonely/the-cure-for-breathing.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Julie',
          path: 'assets/music/lonely/julie.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Unhappy Hour (with Weathers)',
          path: 'assets/music/lonely/unhappy-hour.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Inhale',
          path: 'assets/music/lonely/inhale.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Glass Half Empty',
          path: 'assets/music/lonely/glass-half-empty.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Straitjacket',
          path: 'assets/music/lonely/straitjacket.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Imaginary Friends (with Hey Violet)',
          path: 'assets/music/lonely/imaginary-friends.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Beautiful Lie',
          path: 'assets/music/lonely/beautiful-lie.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Drinking With Cupid',
          path: 'assets/music/lonely/drinking-with-cupid.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Pull The Plug',
          path: 'assets/music/lonely/pull-the-plug.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'BEAUTY SLEEP',
          path: 'assets/music/lonely/beauty-sleep.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        }
      ]
    },
    {
      mood: 'lovesick',
      songs: [
        {
          title: 'Conversations With The Dashboard',
          path: 'assets/music/lovesick/conversations-with-the-dashboard.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Off The Edge (with LUNA AURA)',
          path: 'assets/music/lovesick/off-the-edge.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'after(h)ours (with Chri$tian Gate$)',
          path: 'assets/music/lovesick/after-hours.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Chanel No. 5',
          path: 'assets/music/lovesick/chanel-no-5.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Lovestruck Lobotomy',
          path: 'assets/music/lovesick/lovestruck-lobotomy.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'DOOR NUMBER 3',
          path: 'assets/music/lovesick/door-number-3.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Figure You Out',
          path: 'assets/music/lovesick/figure-you-out.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        },
        {
          title: 'Girls Don\'t Come With Instructions',
          path: 'assets/music/lovesick/girls-dont-come-with-instructions.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Plead The Fifth',
          path: 'assets/music/lovesick/plead-the-fifth.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Long Story Short',
          path: 'assets/music/lovesick/long-story-short.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        },
        {
          title: 'NO WAY TO LIVE',
          path: 'assets/music/lovesick/no-way-to-live.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Potion',
          path: 'assets/music/lovesick/potion.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'Something Blue',
          path: 'assets/music/lovesick/something-blue.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        }
      ]
    },
    {
      mood: 'nostalgic',
      songs: [
        {
          title: 'Miss Me Sometimes?',
          path: 'assets/music/nostalgic/miss-me-sometimes.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'The Treasure (6 Feet Under)',
          path: 'assets/music/nostalgic/the-treasure-6-feet-under.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'The Last Laugh?',
          path: 'assets/music/nostalgic/the-last-laugh.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Love Her Next',
          path: 'assets/music/nostalgic/love-her-next.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Falling Asleep At The Wheel',
          path: 'assets/music/nostalgic/falling-asleep-at-the-wheel.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'CAT N\' MOUSE CABARET',
          path: 'assets/music/nostalgic/cat-n-mouse-cabaret.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'GOOD CRY',
          path: 'assets/music/nostalgic/good-cry.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'One\'s With The Money',
          path: 'assets/music/nostalgic/ones-with-the-money.mp3',
          artwork: 'assets/artwork/happy-never-after.jpg'
        },
        {
          title: 'The Autopsy Of You & Me',
          path: 'assets/music/nostalgic/the-autopsy-of-you-and-me.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Caught It (with Chrissy Costanza)',
          path: 'assets/music/nostalgic/caught-it.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'PAPERROUTE (with WesGhost)',
          path: 'assets/music/nostalgic/paperroute.mp3',
          artwork: 'assets/artwork/the-last-laugh.jpg'
        },
        {
          title: 'Blind Spot (with Cassadee Pope)',
          path: 'assets/music/nostalgic/blind-spot.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Train Of Thoughts',
          path: 'assets/music/nostalgic/train-of-thoughts.mp3',
          artwork: 'assets/artwork/glass-half-empty.jpg'
        },
        {
          title: 'Made For This',
          path: 'assets/music/nostalgic/made-for-this.mp3',
          artwork: 'assets/artwork/the-cure-for-breathing.jpg'
        },
        {
          title: 'Remember',
          path: 'assets/music/nostalgic/remember.mp3',
          artwork: 'assets/artwork/long-story-short.jpg'
        }
      ]
    }
  ];

  constructor(private zone: NgZone) {
    // Ensure duration is updated when metadata loads
    this.audio.addEventListener('loadedmetadata', () => {
      this.zone.run(() => {
        this.duration = this.audio.duration || 0;
      });
    });

    // Continuous updater for currentTime
    setInterval(() => {
      if (this.currentSong) {
        this.zone.run(() => {
          this.currentTime = this.audio.currentTime;
          this.duration = this.audio.duration || 0;
        });
      }
    }, 200); // update 5 times per second

    this.audio.addEventListener('ended', () => this.next());
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

    this.audio.pause();

    this.currentSong = song;
    this.currentTime = 0;

    this.audio.src = song.path;
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