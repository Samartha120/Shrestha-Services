import { useCallback, useEffect, useState } from 'react'
import { galleryApi } from '../services/galleryApi'
import type { GalleryItem } from '@/types/gallery.types'

export function useGallery() {
  const [data, setData] = useState<GalleryItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await galleryApi.getAll())
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchAll()
  }, [fetchAll])

  return { data, loading, error, refetch: fetchAll }
}
