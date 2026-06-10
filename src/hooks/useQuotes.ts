import { useCallback, useEffect, useState } from 'react'
import { quoteApi, type FullQuote } from '../services/quoteApi'

export function useQuotes() {
  const [data, setData] = useState<FullQuote[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await quoteApi.getAll())
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
