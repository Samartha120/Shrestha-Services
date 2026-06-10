import { useCallback, useEffect, useState } from 'react'
import { contactApi } from '../services/contactApi'
import type { Contact } from '@/types/contact.types'

export function useContacts() {
  const [data, setData] = useState<Contact[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await contactApi.getAll())
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
