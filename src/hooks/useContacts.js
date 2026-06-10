import { useCallback, useEffect, useState } from 'react';
import { contactApi } from '../services/contactApi';
export function useContacts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setData(await contactApi.getAll());
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
