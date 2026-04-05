import SignInScreen from '@/components/auth/SignInScreen'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const params = await searchParams

  return (
    <SignInScreen
      nextPath={params.next ?? '/portal/dashboard'}
      initialError={params.error ?? null}
    />
  )
}
