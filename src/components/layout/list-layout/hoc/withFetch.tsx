import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { PaginationOrder, PaginationRequest, PaginationResponse } from '@/lib/types/pagination.type';
import { useFetch } from '@/hooks/useFetch';
import { notifications } from '@mantine/notifications';
import { useList } from '@/hooks/useList';
import { ActionIcon, rem } from '@mantine/core';
import { IconRefresh, IconSearch, IconX } from '@tabler/icons-react';
import { ListLayoutBaseProps, FetchProps, ListLayoutBaseOmittedProps } from '../types';

const withFetch = <T extends object>(
    WrappedComponent: React.ComponentType<ListLayoutBaseProps<T>>
): React.FC<FetchProps<T>> => {

    const ListLayout = ({ url, loadOnMount = true, size = 10, rows, columns, dock, reload = true, ...props }: FetchProps<T>): React.ReactElement | null => {

        const [currentPage, setCurrentPage] = useState<number>(1);
        const [currentFilter, setCurrentFilter] = useState<string | null>(null);
        const [currentBody, setCurrentBody] = useState<PaginationRequest<T>>({ page: currentPage - 1, limit: size });
        const [pagesCount, setPagesCount] = useState(0);
        const [sortBy, setSortBy] = useState<PaginationOrder<T> | null>(null);
        const [shouldFetch, setShouldFetch] = useState<boolean>(false);

        const {
            data: fetchData,
            body: fetchBody,
            loading: fetchLoading,
            error: fetchError,
            request: fetchRequest,
            reload: fetchReload,
            reset: fetchReset,
        } = useFetch<PaginationResponse<T>>(url, 'POST', { body: currentBody });

        const [listData, {
            override: listOverride
        }] = useList<T>([]);

        const handleSearchInput = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
            setCurrentFilter(target.value);
            setCurrentBody(prev => ({ ...prev, filter: target.value }));
        }, []);

        const handlePageChange = useCallback((value: number) => {
            setCurrentPage(value);
            setCurrentBody(prev => {
                const newFetchBody = { ...prev, page: value - 1 };
                fetchRequest(newFetchBody);
                setShouldFetch(true);
                return newFetchBody;
            });
        }, [fetchRequest]);

        const handleEventSort = useCallback((key: keyof T | null) => {
            setSortBy(prev => {
                const currentSortDirection = prev?.order === 'ASC' && prev.key === key;
                const newSortOrder: PaginationOrder<T> | null = key ? { key: key, order: currentSortDirection ? "DESC" : "ASC" } : null;
                return newSortOrder;
            });
            setCurrentBody(prev => {
                const currentSortDirection = prev.order?.order === 'ASC' && prev.order.key === key;
                const newSortOrder: PaginationOrder<T> | undefined = key ? { key: key, order: currentSortDirection ? "DESC" : "ASC" } : undefined;
                const newFetchBody = { ...prev, order: newSortOrder };
                fetchRequest(newFetchBody);
                setShouldFetch(true);
                return newFetchBody;
            });
        }, [fetchRequest]);

        const handleEventClear = useCallback(() => {
            setCurrentFilter(null);
            setCurrentBody(prev => {
                const newFetchBody = { ...prev, filter: undefined };
                fetchRequest(newFetchBody);
                setShouldFetch(true);
                return newFetchBody;
            });
        }, [fetchRequest]);

        const handleEventSearch = useCallback(() => {
            fetchRequest(currentBody);
            setShouldFetch(true);
        }, [currentBody, fetchRequest]);

        const memoizedRows = useMemo(() => listData.map((row) => rows(row)) || [], [rows, listData]);

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

        const SearchFilterButton = useMemo(() => (
            <ActionIcon key='search-button' variant='transparent' onClick={handleEventSearch}>
                <IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ActionIcon>
        ), [handleEventSearch]);

        const ClearFilterButton = useMemo(() => currentFilter
            ? (<ActionIcon color='neutral' variant='transparent' onClick={handleEventClear}>
                <IconX style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ActionIcon>
            ) : undefined, [currentFilter, handleEventClear]);

        const handleEventRefresh = useCallback(() => {
            fetchRequest(currentBody);
            setShouldFetch(true);
        }, [currentBody, fetchRequest]);


        const ReloadButton = useMemo(() => reload ? (
            <ActionIcon variant='light' onClick={handleEventRefresh}>
                <IconRefresh style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>) : undefined, [reload, handleEventRefresh]);


        return <WrappedComponent
            {...(props as ListLayoutBaseOmittedProps<T>)}
            data={memoizedRows}
            total={pagesCount}
            sort={sortBy ? sortBy.key : null}
            onSort={handleEventSort}
            onPageChange={handlePageChange}
            searchProps={{
                value: currentFilter ? currentFilter : '',
                onChange: handleSearchInput,
                rightSection: SearchFilterButton,
                leftSection: ClearFilterButton
            }}
            columns={columns}
            loading={fetchLoading}
            dock={ReloadButton} />
    }

    return ListLayout;
};

export { withFetch };