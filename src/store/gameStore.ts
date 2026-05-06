import { create } from 'zustand';

export type GameScreen = 'TITLE' | 'PLAYING' | 'ARCHIVES' | 'WORKSHOP' | 'LEADERBOARD' | 'ESCAPED' | 'CONSUMED';

interface GameState {
  screen: GameScreen;
  sanity: number;
  oil: number; // Lantern oil
  secretsDiscovered: string[];
  roomLevel: number;
  keys: number;
  ink: number;
  isHallucinating: boolean;
  
  // Actions
  setScreen: (screen: GameScreen) => void;
  reduceSanity: (amount: number) => void;
  increaseSanity: (amount: number) => void;
  consumeOil: (amount: number) => void;
  refillOil: (amount: number) => void;
  addSecret: (secretId: string) => void;
  advanceRoom: () => void;
  addKey: (count: number) => void;
  useKey: () => boolean;
  addInk: (count: number) => void;
  useInk: (count: number) => boolean;
  resetGame: () => void;
}

const INITIAL_STATE = {
  screen: 'TITLE' as GameScreen,
  sanity: 100,
  oil: 100,
  secretsDiscovered: [],
  roomLevel: 1,
  keys: 0,
  ink: 0,
  isHallucinating: false,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...INITIAL_STATE,
  
  setScreen: (screen) => set({ screen }),
  
  reduceSanity: (amount) => set((state) => {
    const newSanity = Math.max(0, state.sanity - amount);
    const hallucinating = newSanity < 30;
    if (newSanity === 0 && state.screen === 'PLAYING') {
      return { sanity: 0, isHallucinating: true, screen: 'CONSUMED' };
    }
    return { sanity: newSanity, isHallucinating: hallucinating };
  }),
  
  increaseSanity: (amount) => set((state) => ({
    sanity: Math.min(100, state.sanity + amount),
    isHallucinating: (state.sanity + amount) < 30
  })),
  
  consumeOil: (amount) => set((state) => ({
    oil: Math.max(0, state.oil - amount)
  })),
  
  refillOil: (amount) => set((state) => ({
    oil: Math.min(100, state.oil + amount)
  })),
  
  addSecret: (secretId) => set((state) => {
    if (state.secretsDiscovered.includes(secretId)) return state;
    return { secretsDiscovered: [...state.secretsDiscovered, secretId] };
  }),
  
  advanceRoom: () => set((state) => {
    const newRoom = state.roomLevel + 1;
    if (newRoom > 13) {
      return { roomLevel: newRoom, screen: 'ESCAPED' };
    }
    return { roomLevel: newRoom };
  }),
  
  addKey: (count) => set((state) => ({ keys: state.keys + count })),
  
  useKey: () => {
    const { keys } = get();
    if (keys > 0) {
      set({ keys: keys - 1 });
      return true;
    }
    return false;
  },

  addInk: (count) => set((state) => ({ ink: state.ink + count })),
  
  useInk: (count) => {
    const { ink } = get();
    if (ink >= count) {
      set({ ink: ink - count });
      return true;
    }
    return false;
  },
  
  resetGame: () => set({ ...INITIAL_STATE, screen: 'TITLE' })
}));
