import { create } from 'zustand';

type CommonState = {
  loading: boolean;
  setLoading: () => void;
  setLoadingFalse: () => void;
  setLoadingTrue: () => void;
};

export const useCommonStore = create<CommonState>((set) => ({
  loading: false,
  setLoading: () => {
    set((state) => ({ loading: !state.loading }));
  },
  setLoadingFalse: () => {
    set({ loading: false });
  },
  setLoadingTrue: () => {
    set({ loading: true });
  }
}));
