import { useCallback, useEffect, useState } from 'react'
import { projectApi } from '../services/projectApi'
import type { Project } from '@/types/project.types'

export function useProjects() {
  const [data, setData] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await projectApi.getAll())
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
