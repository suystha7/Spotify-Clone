import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  shuffled: boolean;
  repeat: boolean;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  toggleRepeat: () => void;
  playNext: () => void;
  playPrevious: () => void;
  shufflePlaylist: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  shuffled: false,
  repeat: false,

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    const song = songs[startIndex];
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    set({ isPlaying: !get().isPlaying });
  },

  toggleRepeat: () => {
    set((state) => ({ repeat: !state.repeat }));
  },

  playNext: () => {
    const { currentIndex, queue, repeat } = get();
    if (repeat) {
      // If repeat is on, restart the current song
      set({ isPlaying: true });
      return;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      set({
        currentIndex: nextIndex,
        currentSong: queue[nextIndex],
        isPlaying: true,
      });
    } else {
      // If it's the last song, stop playing
      set({ isPlaying: false });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      set({
        currentIndex: prevIndex,
        currentSong: queue[prevIndex],
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },

  shufflePlaylist: () => {
    const { queue, currentSong, shuffled } = get();
    if (queue.length <= 1) return;

    if (shuffled) {
      // If already shuffled, revert to the original order
      set({ shuffled: false });
      return;
    }

    const shuffledQueue = [...queue];

    // Fisher-Yates Shuffle
    for (let i = shuffledQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQueue[i], shuffledQueue[j]] = [
        shuffledQueue[j],
        shuffledQueue[i],
      ];
    }

    // Ensure the current song remains in the shuffled queue
    const currentIndex = shuffledQueue.findIndex(
      (song) => song._id === currentSong?._id
    );

    set({
      queue: shuffledQueue,
      currentIndex: currentIndex !== -1 ? currentIndex : 0,
      currentSong: shuffledQueue[currentIndex !== -1 ? currentIndex : 0],
      isPlaying: true,
      shuffled: true,
    });
  },
}));
