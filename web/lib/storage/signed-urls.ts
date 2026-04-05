import { createServerSupabaseClient } from '@/lib/auth/server'
import { getDocumentBucketName } from '@/lib/storage/upload'

export async function createSignedDownloadUrl(storagePath: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.storage
    .from(getDocumentBucketName())
    .createSignedUrl(storagePath, 60)

  if (error) {
    throw error
  }

  return data.signedUrl
}

export async function createSignedUpload(storagePath: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.storage
    .from(getDocumentBucketName())
    .createSignedUploadUrl(storagePath)

  if (error) {
    throw error
  }

  return data
}
