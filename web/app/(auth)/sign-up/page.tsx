'use client'

import AuthCard from '@/components/auth/AuthCard'
import SignUpForm from '@/components/auth/SignUpForm'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SignUpPage() {
  const { t } = useLanguage()

  return (
    <AuthCard
      eyebrow={t.auth.signUp.eyebrow}
      title={t.auth.signUp.title}
      description={t.auth.signUp.description}
      footerLabel={t.auth.signUp.footerLabel}
      footerHref="/sign-in"
      footerCta={t.auth.signUp.footerCta}
    >
      <SignUpForm />
    </AuthCard>
  )
}
