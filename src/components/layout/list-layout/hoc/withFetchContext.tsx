import { ActionIcon, rem } from "@mantine/core";
import { IconSearch, IconX, IconRefresh } from "@tabler/icons-react";
import { useState, useCallback, ChangeEvent, useMemo } from "react";
import { useListFetchPaginationContext } from "../context/ListFetchPaginationContext";
import { ListLayoutBaseProps, FetchContextProps, ListLayoutBaseOmittedProps } from "../types";

const withFetchContext = <T extends object>(
    WrappedComponent: React.ComponentType<ListLayoutBaseProps<T>>
): React.FC<FetchContextProps<T>> => {

    const ListLayout = ({ rows, columns, dock, reload = true, ...props }: FetchContextProps<T>): React.ReactElement | null => {

        const [searchValue, setSearchValue] = useState<string>("");
        const [sort, setSort] = useState<keyof T | null>(null);

        const {
            data,
            loading,
            pageCount,
            setSortBy,
            setFilter,
            setPage,
            trigger,
        } = useListFetchPaginationContext();

        const handleChangeEventSearch = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(target.value);
            setFilter(target.value);
        }, [setFilter]);

        const handleEventClear = useCallback(() => {
            setSearchValue("");
            setFilter(null);
        }, [setFilter]);

        const handleEventSearch = useCallback(() => {
            trigger();
        }, [trigger]);

        const handleEventSort = useCallback((key: keyof T | null) => {
            setSort(key);
            setSortBy(key);
        }, [setSortBy]);

        const memoizedRows = useMemo(() => data.map((row) => rows(row)) || [], [rows, data]);

        const SearchFilterButton = useMemo(() => (
            <ActionIcon key='search-button' variant='transparent' onClick={handleEventSearch}>
                <IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ActionIcon>
        ), [handleEventSearch]);

        const ClearFilterButton = useMemo(() => searchValue.length
            ? (<ActionIcon color='neutral' variant='transparent' onClick={handleEventClear}>
                <IconX style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ActionIcon>
            ) : undefined, [searchValue, handleEventClear]);

        const handleEventRefresh = useCallback(() => {
            trigger();
        }, [trigger]);


        const ReloadButton = useMemo(() => reload ? (
            <ActionIcon variant='light' onClick={handleEventRefresh}>
                <IconRefresh style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>) : undefined, [reload, handleEventRefresh]);


        return <WrappedComponent
            {...(props as ListLayoutBaseOmittedProps<T>)}
            data={memoizedRows}
            total={pageCount}
            sort={sort}
            onSort={handleEventSort}
            onPageChange={setPage}
            searchProps={{
                value: searchValue,
                onChange: handleChangeEventSearch,
                rightSection: SearchFilterButton,
                leftSection: ClearFilterButton
            }}
            columns={columns}
            loading={loading}
            dock={ReloadButton} />
    }

    return ListLayout;
};

export { withFetchContext }