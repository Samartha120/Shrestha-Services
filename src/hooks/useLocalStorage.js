import { useCallback, useEffect, useState } from 'react';
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initialValue;
        }
        catch {
            return initialValue;
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch {
            // ignore
        }
    }, [key, value]);
    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key);
        }
        catch {
            // ignore
        }
    }, [key]);
    return { value, setValue, remove };
}
