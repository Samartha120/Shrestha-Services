import { useCallback, useEffect, useState } from 'react';
import { analyticsApi } from '../services/analyticsApi';
export function useAnalytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchSummary = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setData(await analyticsApi.getStats());
        }
        catch (e) {
            setError(e);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        void fetchSummary();
    }, [fetchSummary]);
    return { data, loading, error, refetch: fetchSummary };
}
