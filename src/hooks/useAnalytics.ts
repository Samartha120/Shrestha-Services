import { useCallback, useEffect, useState } from 'react'
import { analyticsApi } from '../services/analyticsApi'

export interface AnalyticsSummary {
  totalServices: number;
  totalProjects: number;
  totalQuotes: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyGrowth: number;
  totalVisitors: number;
}

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchSummary = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await analyticsApi.getStats())
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchSummary()
  }, [fetchSummary])

  return { data, loading, error, refetch: fetchSummary }
}
