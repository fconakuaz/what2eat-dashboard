import { create } from 'zustand';

type CommonState = {
  loading: boolean;
  loading2: boolean;
  selectedDate: Date | undefined;
  setLoading: () => void;
  setLoadingFalse: () => void;
  setLoadingTrue: () => void;
  setLoading2False: () => void;
  setLoading2True: () => void;
  setDate: (date: Date | undefined) => void;
  resetDate: () => void;
};

export const useCommonStore = create<CommonState>((set) => ({
  loading: false,
  loading2: false,
  selectedDate: new Date(),

  setLoading: () => {
    set((state) => ({ loading: !state.loading }));
  },
  setLoadingFalse: () => {
    set({ loading: false });
  },
  setLoadingTrue: () => {
    set({ loading: true });
  },
  setLoading2False: () => {
    set({ loading: false });
  },
  setLoading2True: () => {
    set({ loading: true });
  },

  setDate: (date: Date | undefined) => {
    console.log('🟡🟡🟡 date 🟡🟡🟡');
    console.log(date);
    set({ selectedDate: date });
  },

  resetDate: () => {
    set({ selectedDate: new Date() });
  }
}));
