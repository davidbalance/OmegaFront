import { Header } from '@/components/header/Header';
import { InputSearch } from '@/components/input/search/InputSearch';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { OmegaTable } from '@/components/table';
import { OmegaTd } from '@/components/table/omega-td/OmegaTd';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useChunk } from '@/hooks/useChunk';
import { useFilter } from '@/hooks/useFilter/useFilter';
import { useSort } from '@/hooks/useSort';
import { Flex, Grid, Table, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'

export type ColumnOptions<T extends object> = {
    name: string;
    key: keyof T;
}

export type ActionColumnProps<T extends object> = {
    value: T
}

type ActionColumnOptions<T extends object> = {
    name: string;
    child: (props: ActionColumnProps<T>) => React.ReactElement<ActionColumnProps<T>>
}

type TableLayoutProps<T extends object> = {
    /**
     * Titulo de la tabla.
     */
    title: string;
    /**
     * Columnas que seran renderizadas.
     */
    columns: ColumnOptions<T>[];
    /**
     * Arreglo de datos para ser renderizados.
     */
    data: T[];
    /**
     * Estado de carga de la tabla.
     */
    isLoading: boolean;
    /**
     * Elemento react de la columna de accion.
     */
    action?: ActionColumnOptions<T>;
    /**
     * Elementos que se situan a un lado del buscador, solo se aceptan componentes de react.
     */
    dock?: React.ReactElement | React.ReactElement[];
    /**
     * Tamaño de elementos que seran redenrizados por pagina.
     */
    size?: number;
}

const TableLayout: <T extends object, >(props: TableLayoutProps<T>) => React.ReactElement | null = ({ title, columns, data, action, dock, isLoading, size = 50 }) => {

    const match = useMediaQuery('(max-width: 700px)');

    const [filteredData, FilterHandlers, FilterValues] = useFilter(data, columns.map(e => e.key));
    const [sortedData, { sortBy: sortByHandler }, { sortBy: sortByValue }] = useSort(filteredData);
    const [chunkData, , ChunkValues] = useChunk(sortedData, size);
    const [page, setPage] = useState<number>(1);

    const sort = useCallback((key: any) => () => sortByHandler(key), [sortByHandler]);

    const header = useMemo(() => {
        const headers = columns.map((e) => (
            <OmegaTh key={e.key as string} sort={{
                onSort: sort(e.key),
                sorted: sortByValue === e.key
            }}>{e.name}
            </OmegaTh>
        ));
        if (action) {
            headers.push(action ? <OmegaTh key='action'>{action.name}</OmegaTh> : <></>);
        }
        return headers;
    }, [columns, action, sortByValue, sort]);

    const rows = useMemo(() => {
        if (chunkData[page - 1]) {
            return chunkData[page - 1].map((row, index) => (
                <Table.Tr key={index}>
                    {columns.map((e) =>
                        <OmegaTd key={e.key as string}>{typeof row[e.key] === 'object' ? JSON.stringify(row[e.key]) : `${row[e.key]}`}</OmegaTd>
                    )}
                    {action && <OmegaTd key='action'>{action.child({ value: row })}</OmegaTd>}
                </Table.Tr>
            ));
        } else {
            return [];
        }
    }, [chunkData, page, columns, action]);

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        FilterHandlers.setFilterText(event.target.value);
    }

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    return (
        <Flex h='100%' direction='column' gap={rem(8)}>
            <ModularBox>
                <Grid>
                    <Grid.Col span={dock ? (match ? 11 : 8) : 12}  >
                        <InputSearch
                            placeholder="Buscar"
                            value={FilterValues.text}
                            onChange={handleSearchInput}
                        />
                    </Grid.Col>
                    {
                        dock && <Grid.Col span={match ? 1 : 4}>
                            <Flex direction='row' justify='flex-end' align='center' h='100%'>{dock}</Flex>
                        </Grid.Col>
                    }
                </Grid>
            </ModularBox>

            <ModularBox h='100%'>
                <Header text={title} />
                <OmegaTable
                    loading={isLoading}
                    header={header}
                    rows={rows}
                    total={data.length / ChunkValues.size}
                    page={page}
                    onPageChange={handlePageChange} />
            </ModularBox>
        </Flex>
    )
}

export { TableLayout }