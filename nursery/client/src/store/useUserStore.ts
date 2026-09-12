import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminInfo {
  _id: string;
  username: string;
  token: string;
}

interface UserState {
  adminInfo: AdminInfo | null;
  setAdminInfo: (info: AdminInfo) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      adminInfo: null,
      
      setAdminInfo: (info) => set({ adminInfo: info }),
      
      logout: () => set({ adminInfo: null }),
    }),
    {
      name: 'nursery-admin-storage',
    }
  )
);
