'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'

type TranslationsType = {
  navigation: {
    home: string
    about: string
    events: string
    contact: string
  }
  common: {
    readMore: string
    loading: string
  }
}

export const useGlobalTranslations = () => {
  const { language } = useLanguage()
  const [translations, setTranslations] = useState<TranslationsType | null>(null)

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/api/globals/translations?locale=${language}`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error('Failed to fetch translations:', error)
      }
    }

    fetchTranslations()
  }, [language])

  return translations
}