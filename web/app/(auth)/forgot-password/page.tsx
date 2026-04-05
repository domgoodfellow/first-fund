'use client'

import AuthCard from '@/components/auth/AuthCard'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ForgotPasswordPage() {
  const { t } = useLanguage()

  return (
    <AuthCard
      eyebrow={t.auth.forgotPassword.eyebrow}
      title={t.auth.forgotPassword.title}
      description={t.auth.forgotPassword.description}
      footerLabel={t.auth.forgotPassword.footerLabel}
      footerHref="/sign-in"
      footerCta={t.auth.forgotPassword.footerCta}
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}
