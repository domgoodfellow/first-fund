'use client'

import AuthCard from '@/components/auth/AuthCard'
import SignInForm from '@/components/auth/SignInForm'
import { useLanguage } from '@/contexts/LanguageContext'

interface SignInScreenProps {
  nextPath: string
  initialError?: string | null
}

export default function SignInScreen({
  nextPath,
  initialError,
}: SignInScreenProps) {
  const { t } = useLanguage()

  return (
    <AuthCard
      eyebrow={t.auth.signIn.eyebrow}
      title={t.auth.signIn.title}
      description={t.auth.signIn.description}
      footerLabel={t.auth.signIn.footerLabel}
      footerHref="/sign-up"
      footerCta={t.auth.signIn.footerCta}
    >
      <SignInForm nextPath={nextPath} initialError={initialError} />
    </AuthCard>
  )
}
