'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Language, translations, Translations } from '@/lib/i18n'

export const brandName = 'First Fund'
const STORAGE_KEY = 'ff-language'

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

export function LanguageProvider({
  children,
  initialLanguage = 'en',
  hydrateFromStorage = true,
}: {
  children: React.ReactNode
  initialLanguage?: Language
  hydrateFromStorage?: boolean
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    if (!hydrateFromStorage) {
      setLanguage(initialLanguage)
      return
    }

    const storedLanguage = window.localStorage.getItem(STORAGE_KEY)
    if (storedLanguage === 'en' || storedLanguage === 'es') {
      setLanguage(storedLanguage)
      return
    }

    setLanguage(initialLanguage)
  }, [hydrateFromStorage, initialLanguage])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language] as Translations,
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
