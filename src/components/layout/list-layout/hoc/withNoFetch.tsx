import { useChunk } from '@/hooks/useChunk';
import { useFilter } from '@/hooks/useFilter/useFilter';
import { useSort } from '@/hooks/useSort';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { ListLayoutBaseProps, NoFetchProps, ListLayoutBaseOmittedProps } from '../types';

const withNoFetch = <T extends object>(
    WrappedComponent: React.ComponentType<ListLayoutBaseProps<T>>
): React.FC<NoFetchProps<T>> => {

    const ListLayout = ({ data, size = 10, rows, columns, ...props }: NoFetchProps<T>): React.ReactElement | null => {

        const [filteredData, FilterHandlers, FilterValues] = useFilter(data, columns.map((e) => e.key));
        const [sortedData, { sortBy: sortByHandler }, { sortBy: sortByValue }] = useSort<T>(filteredData);
        const [chunkData, , { size: chunkSizeValue }] = useChunk(sortedData, size);
        const [page, setPage] = useState<number>(1);

        const total = useMemo(() => filteredData ? Math.ceil(filteredData.length / chunkSizeValue) : 0, [filteredData, chunkSizeValue]);

        const memoizedRows = useMemo(() => chunkData[page - 1]?.map((row) => rows(row)) || [], [rows, chunkData, page]);


        const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => FilterHandlers.setFilterText(event.target.value);
        const handlePageChange = useCallback((value: number) => setPage(value), []);

        return <WrappedComponent
            {...(props as ListLayoutBaseOmittedProps<T>)}
            data={memoizedRows}
            total={total}
            sort={sortByValue}
            onSort={sortByHandler}
            onPageChange={handlePageChange}
            searchProps={{
                value: FilterValues.text,
                onChange: handleSearchInput
            }}
            columns={columns} />
    }

    return ListLayout;
};

export { withNoFetch };