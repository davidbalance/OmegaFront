import { useChunk } from '@/hooks/useChunk';
import { useFilter } from '@/hooks/useFilter';
import { useSort } from '@/hooks/useSort';
import { Center, Flex, Loader, Pagination, ScrollArea, Text, UnstyledButton, rem } from '@mantine/core';
import React, { ChangeEvent, useMemo, useState } from 'react'
import classes from './ListLayout.module.css'
import { IconX } from '@tabler/icons-react';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { SearchInputText } from '@/components/input/SearchInputText';
import { ListRowElementProps } from './ListRowElement';
import { ListHeaderButton } from './ListHeaderButton';

export interface ListElement<T> {
    key: keyof T;
    name: string;
}

interface ListLayoutProps<T> {
    data: T[];
    loading: boolean;
    columns: ListElement<T>[];
    height?: number;
    size?: number;
    rows: (row: T) => React.ReactElement<ListRowElementProps>;
}

const ListLayout = <T extends object>({ data, loading, columns, height = 350, size = 10, rows }: ListLayoutProps<T>): React.ReactElement | null => {

    const [filteredData, FilterHandlers, FilterValues] = useFilter(data, columns.map((e) => e.key));
    const [sortedData, SortedHandlers, SortValues] = useSort(filteredData);
    const [chunkData, , ChunkValues] = useChunk(sortedData, size);
    const [page, setPage] = useState<number>(1);

    const sort = (key: keyof T) => () => SortedHandlers.sortBy(key);

    const total = useMemo(() => Math.ceil(filteredData.length / ChunkValues.size), [filteredData.length, ChunkValues.size]);

    const header = useMemo(
        () =>
            columns.map((e) => (
                <ListHeaderButton
                    key={String(e.key)}
                    label={e.name}
                    sort={{ onSort: sort(e.key), sorted: SortValues.sortBy === e.key }}
                />
            )),
        [columns, SortValues]
    );

    const memoizedRows = useMemo(() => chunkData[page - 1]?.map((row) => rows(row)) || [], [rows, chunkData, page]);

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => FilterHandlers.setFilterText(event.target.value);
    const handlePageChange = (value: number) => setPage(value);

    return (
        <Flex direction='column' gap={rem(8)} h='100%'>
            <ModularBox>
                <SearchInputText placeholder="Buscar" value={FilterValues.text} onChange={handleSearchInput} />
            </ModularBox>

            <ModularBox flex={1}>
                <Flex className={classes.header} w="100%">
                    {header}
                    {SortValues.sortBy && (
                        <UnstyledButton
                            className={classes.control}
                            data-active={true}
                            onClick={() => SortedHandlers.sortBy(null)}
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