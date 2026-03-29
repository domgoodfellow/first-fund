'use client'

import { createContext, useContext, useState } from 'react'
import { Language, translations, Translations } from '@/lib/i18n'

export const brandName = 'FirsFund'

interface LanguageContextValue {
  language: Language
  setLanguage: (l: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] as Translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
