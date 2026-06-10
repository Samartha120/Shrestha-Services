import { useMemo, useState } from 'react';
export function usePagination(pageSize = 10) {
    const [page, setPage] = useState(1);
    const value = useMemo(() => {
        const limit = pageSize;
        const offset = (page - 1) * pageSize;
        return { page, setPage, limit, offset };
    }, [page, pageSize]);
    return value;
}
