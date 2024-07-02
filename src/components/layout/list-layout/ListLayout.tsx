import { useChunk } from '@/hooks/useChunk';
import { useFilter } from '@/hooks/useFilter/useFilter';
import { useSort } from '@/hooks/useSort';
import { Center, Flex, Grid, Loader, Pagination, ScrollArea, Text, UnstyledButton, rem } from '@mantine/core';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import classes from './ListLayout.module.css'
import { IconX } from '@tabler/icons-react';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { ListRowElementProps } from './ListRowElement';
import { ListHeaderButton } from './ListHeaderButton';
import { useMediaQuery } from '@mantine/hooks';
import { InputSearch } from '@/components/input/search/InputSearch';

export interface ListElement<T> {
    key: keyof T;
    name: string;
}

interface ListLayoutProps<T> {
    /**
     * Arreglo de datos para ser renderizados.
     */
    data: T[];
    /**
     * Estado de carga.
     */
    loading: boolean;
    /**
     * Columnas que seran visualizadas en el encabezado.
     */
    columns: ListElement<T>[];
    /**
     * Altura del contenido.
     */
    height?: number;
    /**
     * Numero de items que seran renderizados en cada pagina.
     */
    size?: number;
    /**
     * Elementos adicionales, se posicionaran a un lado del area de busqueda.
     */
    dock?: React.ReactElement | React.ReactElement[];
    /**
     * Funcion que es invocada al momento de renderizar cada fila, debe retornar un elemento react.
     * @param row 
     * @returns 
     */
    rows: (row: T) => React.ReactElement<ListRowElementProps>;
}

const ListLayout = <T extends object>({ data, loading, columns, height = 350, size = 10, dock, rows }: ListLayoutProps<T>): React.ReactElement | null => {

    const [filteredData, FilterHandlers, FilterValues] = useFilter(data, columns.map((e) => e.key));
    const [sortedData, { sortBy: sortByHandler }, { sortBy: sortByValue }] = useSort(filteredData);
    const [chunkData, , { size: chunkSizeValue }] = useChunk(sortedData, size);
    const [page, setPage] = useState<number>(1);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const sort = useCallback((key: keyof T) => () => sortByHandler(key), [sortByHandler]);

    const total = useMemo(() => Math.ceil(filteredData.length / chunkSizeValue), [filteredData.length, chunkSizeValue]);

    const header = useMemo(
        () =>
            columns.map((e) => (
                <ListHeaderButton
                    key={String(e.key)}
                    label={e.name}
                    sort={{ onSort: sort(e.key), sorted: sortByValue === e.key }}
                />
            )),
        [columns, sortByValue, sort]
    );

    const memoizedRows = useMemo(() => chunkData[page - 1]?.map((row) => rows(row)) || [], [rows, chunkData, page]);

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => FilterHandlers.setFilterText(event.target.value);
    const handlePageChange = (value: number) => setPage(value);

    return (
        <Flex direction='column' gap={rem(8)} h='100%'>
            <ModularBox>
                <Grid>
                    <Grid.Col span={dock ? (isMobile ? 11 : 8) : 12}  >
                        <InputSearch
                            placeholder="Buscar"
                            value={FilterValues.text}
                            onChange={handleSearchInput}
                        />
                    </Grid.Col>
                    {
                        dock && <Grid.Col span={isMobile ? 1 : 4}>
                            <Flex direction='row' justify='flex-end' align='center' h='100%'>{dock}</Flex>
                        </Grid.Col>
                    }
                </Grid>
            </ModularBox>

            <ModularBox flex={1}>
                <Flex className={classes.header} w="100%">
                    {header}
                    {sortByValue && (
                        <UnstyledButton
                            className={classes.control}
                            data-active={true}
                            onClick={() => sortByHandler(null)}
                            h="100%"
                        >
                            <Center className={classes.icon}>
                                <IconX className={classes['icon-size']} stroke={1.5} />
                            </Center>
                        </UnstyledButton>
                    )}
                </Flex>
                {loading ? (
                    <Flex justify="center" align="center">
                        <Loader size="sm" m="md" />
                        <Text>Cargando recursos...</Text>
                    </Flex>
                ) : memoizedRows.length === 0 ? (
                    <Text ta="center">No hay datos agregados</Text>
                ) : (
                    <ScrollArea h={height} px={rem(4)} className={classes['item-container']}>
                        <Flex gap={rem(2)} direction="column">
                            {memoizedRows}
                        </Flex>
                    </ScrollArea>
                )}
            </ModularBox>

            {
                total > 1 && (
                    <ModularBox justify="center" align="center">
                        <Pagination
                            total={total}
                            color="orange"
                            size="sm"
                            value={page}
                            radius="xl"
                            onChange={handlePageChange}
                            withEdges
                        />
                    </ModularBox>
                )
            }
        </Flex>
    );
};

export { ListLayout };