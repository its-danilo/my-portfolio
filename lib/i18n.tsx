"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEY, type Lang, type Localized } from '@/lib/language';

export type { Lang, Localized };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server always renders English; the language picked by languageScript
  // takes over right after hydration.
  const [lang, setLangState] = useState<Lang>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.lang === 'pt') setLangState('pt');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    root.dataset.lang = lang;
    root.classList.remove('lang-pending');
  }, [lang, ready]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice lasts until the page closes.
    }
  };

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// The current language's version of a component's text.
export function useCopy<T>(copy: Localized<T>): T {
  return copy[useLanguage().lang];
}
