import { useCallback, useEffect, useState } from 'react'
import { serviceApi } from '../services/serviceApi'
import type { Service } from '@/types/service.types'

export function useServices() {
  const [data, setData] = useState<Service[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await serviceApi.getAll())
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
