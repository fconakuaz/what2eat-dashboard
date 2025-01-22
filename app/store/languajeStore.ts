import { create } from 'zustand';
import Cookies from 'js-cookie';

type LanguageState = {
  locale?: string;
  setLocale: (locale: string) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: Cookies.get('locale') || 'es', // Leer el idioma de la cookie o usar un valor predeterminado
  setLocale: (locale: string) => {
    Cookies.set('locale', locale);
    set({ locale });
    window.location.reload();
  }
}));
