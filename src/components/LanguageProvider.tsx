'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMessages, Locale, locales } from '@/lib/i18n';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getMessages>;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('lv');

  useEffect(() => {
    const saved = localStorage.getItem('dar_locale') as Locale | null;
    if (saved && locales.some((item) => item.code === saved)) setLocaleState(saved);
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem('dar_locale', next);
    document.documentElement.lang = next;
  }

  const value = useMemo(() => ({ locale, setLocale, t: getMessages(locale) }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside LanguageProvider');
  return value;
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <div className="language-switch" aria-label="Language">
      {locales.map((item) => (
        <button key={item.code} className={locale === item.code ? 'active' : ''} onClick={() => setLocale(item.code)} type="button">
          {item.label}
        </button>
      ))}
    </div>
  );
}
