import type { User } from '@/types/User';
import { create } from 'zustand';

type State = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type Action = {
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  clearAuth: () => void;
};

const initialState: State = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
};

const useAuthStore = create<State & Action>((set) => ({
  ...initialState,

  setUser: (user) => set({ user }),

  setAccessToken: (token) => set({ accessToken: token }),

  setRefreshToken: (token) => set({ refreshToken: token }),

  clearAuth: () => set(initialState),
}));

export default useAuthStore;
