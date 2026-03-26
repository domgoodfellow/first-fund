'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations, Translations } from '@/lib/i18n'

export type Country = 'US' | 'CA'

// Available languages per country
export const countryLanguages: Record<Country, Language[]> = {
  US: ['en', 'es'],
  CA: ['en', 'fr'],
}

interface CountryContextValue {
  country: Country
  setCountry: (c: Country) => void
  language: Language
  setLanguage: (l: Language) => void
  brandName: string
  currency: string
  t: Translations
}

const CountryContext = createContext<CountryContextValue>({
  country: 'US',
  setCountry: () => {},
  language: 'en',
  setLanguage: () => {},
  brandName: 'FirsFund',
  currency: 'USD',
  t: translations.en,
})

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<Country>('US')
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    document.documentElement.setAttribute('data-country', country)
  }, [country])

  const setCountry = (c: Country) => {
    setCountryState(c)
    setLanguageState('en')
  }

  const setLanguage = (l: Language) => {
    setLanguageState(l)
  }

  return (
    <CountryContext.Provider
      value={{
        country,
        setCountry,
        language,
        setLanguage,
        brandName: country === 'US' ? 'FirsFund' : 'NextFund',
        currency: country === 'US' ? 'USD' : 'CAD',
        t: translations[language],
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export const useCountry = () => useContext(CountryContext)
