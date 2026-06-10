import { useCallback, useEffect, useState } from 'react';
import { testimonialApi } from '../services/testimonialApi';
export function useTestimonials() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setData(await testimonialApi.getAll());
        }
        catch (e) {
            setError(e);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        void fetchAll();
    }, [fetchAll]);
    return { data, loading, error, refetch: fetchAll };
}
