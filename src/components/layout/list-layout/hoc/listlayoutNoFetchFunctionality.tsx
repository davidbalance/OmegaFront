import { useChunk } from '@/hooks/useChunk';
import { useFilter } from '@/hooks/useFilter/useFilter';
import { useSort } from '@/hooks/useSort';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { ListLayoutBaseProps } from '../ListLayoutBase';
import { ListRowElementProps } from '../ListRowElement';

interface ListLayoutOmittedBase<T> extends Omit<ListLayoutBaseProps<T>, 'data' | 'total' | 'sort' | 'onSort' | 'onPageChange' | 'searchProps'> { }

interface ListLayoutExtendedFunctionalityProps<T> {
    /**
     * Arreglo de datos para ser renderizados.
     */
    data: T[];
    /**
     * Numero de items que seran renderizados en cada pagina.
     */
    size?: number;
    /**
     * Funcion que es invocada al momento de renderizar cada fila, debe retornar un elemento react.
     * @param row 
     * @returns 
     */
    rows: (row: T) => React.ReactElement<ListRowElementProps>;
}

export type ListLayoutProps<T> = ListLayoutExtendedFunctionalityProps<T> & ListLayoutOmittedBase<T>;

const listlayoutNoFetchFunctionality = <T extends object>(
    WrappedComponent: React.ComponentType<ListLayoutBaseProps<T>>
): React.FC<ListLayoutProps<T>> => {

    const ListLayout = ({ data, size = 10, rows, columns, ...props }: ListLayoutProps<T>): React.ReactElement | null => {

        const [filteredData, FilterHandlers, FilterValues] = useFilter(data, columns.map((e) => e.key));
        const [sortedData, { sortBy: sortByHandler }, { sortBy: sortByValue }] = useSort<T>(filteredData);
        const [chunkData, , { size: chunkSizeValue }] = useChunk(sortedData, size);
        const [page, setPage] = useState<number>(1);

        const total = useMemo(() => Math.ceil(filteredData.length / chunkSizeValue), [filteredData.length, chunkSizeValue]);

        const memoizedRows = useMemo(() => chunkData[page - 1]?.map((row) => rows(row)) || [], [rows, chunkData, page]);


        const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => FilterHandlers.setFilterText(event.target.value);
        const handlePageChange = useCallback((value: number) => setPage(value), []);

        return <WrappedComponent
            {...(props as ListLayoutOmittedBase<T>)}
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

export { listlayoutNoFetchFunctionality };