import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { PaginationOrder, PaginationRequest, PaginationResponse } from '@/lib/types/pagination.type';
import { notifications } from '@mantine/notifications';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface ListFetchPaginationContextProps<T extends object> {
    data: T[];
    page: number;
    pageCount: number;
    loading: boolean;
    size: number;
    setPage: (value: number) => void;
    setFilter: (value: string | null) => void;
    setSortBy: (value: keyof T | null) => void;
    trigger: () => void;
}

const ListFetchPaginationContext = createContext<ListFetchPaginationContextProps<any> | undefined>(undefined);

const useListFetchPaginationContext = () => {
    const context = useContext(ListFetchPaginationContext);
    if (!context) {
        throw new Error('useListFetchContext must be used within a ListFetchPaginationContext');
    }
    return context;
}

export interface ListLayoutFetchForceItemUpdate<T extends object> {
    key: keyof T;
    value: any;
    newValue: Partial<T>;
    callback: () => void;
}

interface ListLayoutFetchProviderProps<T extends object> {
    url: string;
    size?: number;
    children: React.ReactNode;
    loadOnMount?: boolean;
    forceItemUpdate?: ListLayoutFetchForceItemUpdate<T> | null;
}
const ListLayoutFetchProvider = <T extends object>({ children, url, size = 10, loadOnMount, forceItemUpdate }: ListLayoutFetchProviderProps<T>) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentBody, setCurrentBody] = useState<PaginationRequest<T>>({ page: currentPage - 1, limit: size });
    const [pagesCount, setPagesCount] = useState(0);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const [currentSize] = useState<number>(size);

    const [listData, {
        override: listOverride,
        update: listUpdate
    }] = useList<T>([]);

    const {
        data: fetchData,
        body: fetchBody,
        loading: fetchLoading,
        error: fetchError,
        request: fetchRequest,
        reload: fetchReload,
        reset: fetchReset,
    } = useFetch<PaginationResponse<T>>(url, 'POST', { loadOnMount, body: currentBody });

    const handlePageChange = useCallback((value: number) => {
        setCurrentPage(value);
        setCurrentBody(prev => {
            const newFetchBody = { ...prev, page: value - 1 };
            fetchRequest(newFetchBody);
            setShouldFetch(true);
            return newFetchBody;
        });
    }, [fetchRequest]);

    const handleChangeEventFilter = useCallback((value: string | null) => {
        setCurrentBody(prev => ({ ...prev, filter: value ? value : undefined }));
    }, []);

    const handleEventSort = useCallback((key: keyof T | null) => {
        setCurrentBody(prev => {
            const currentSortDirection = prev.order?.order === 'ASC' && prev.order.key === key;
            const newSortOrder: PaginationOrder<T> | undefined = key ? { key: key, order: currentSortDirection ? "DESC" : "ASC" } : undefined;
            const newFetchBody = { ...prev, order: newSortOrder };
            fetchRequest(newFetchBody);
            setShouldFetch(true);
            return newFetchBody;
        });
    }, [fetchRequest]);

    const handleTriggerFetch = useCallback(() => {
        fetchRequest(currentBody);
        setShouldFetch(true);
    }, [fetchRequest, currentBody]);

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    useEffect(() => {
        if (fetchData) {
            const { pages, data } = fetchData;
            listOverride(data);
            if (pages !== pagesCount) setPagesCount(pages);
            fetchReset();
        }
    }, [fetchData, pagesCount, fetchReset, listOverride]);

    useEffect(() => {
        if (shouldFetch && fetchBody) {
            fetchReload();
            setShouldFetch(false);
        }
    }, [shouldFetch, fetchBody, fetchReload]);

    useEffect(() => {
        if (forceItemUpdate) {
            const { callback, key, newValue, value } = forceItemUpdate;
            listUpdate(key, value, newValue);
            callback();
        }
    }, [forceItemUpdate]);

    const value = useMemo((): ListFetchPaginationContextProps<T> => ({
        data: listData,
        page: currentPage,
        pageCount: pagesCount,
        size: currentSize,
        loading: fetchLoading,
        setPage: handlePageChange,
        setFilter: handleChangeEventFilter,
        setSortBy: handleEventSort,
        trigger: handleTriggerFetch,
    }), [
        listData,
        currentPage,
        pagesCount,
        currentSize,
        fetchLoading,
        handlePageChange,
        handleChangeEventFilter,
        handleEventSort,
        handleTriggerFetch
    ]);

    return (
        <ListFetchPaginationContext.Provider value={value}>
            {children}
        </ListFetchPaginationContext.Provider>
    );
}

export { ListLayoutFetchProvider, useListFetchPaginationContext };