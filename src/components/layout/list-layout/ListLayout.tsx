import { useChunk } from '@/hooks/useChunk';
import { useFilter } from '@/hooks/useFilter';
import { useSort } from '@/hooks/useSort';
import { Center, Flex, Pagination, ScrollArea, UnstyledButton, rem } from '@mantine/core';
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
    columns: ListElement<T>[];
    leftSection: boolean;
    rightSection: boolean;
    rows: (row: T) => React.ReactElement<ListRowElementProps<T>>;
}

const ListLayout: <T extends object, >(props: ListLayoutProps<T>) => React.ReactElement | null = ({ data, columns, rows }) => {

    const [filteredData, FilterHandlers, FilterValues] = useFilter(data, columns.map(e => e.key));
    const [sortedData, SortedHandlers, SortValues] = useSort(filteredData);
    const [chunkData, , ChunkValues] = useChunk(sortedData);
    const [page, setPage] = useState<number>(1);

    const sort = (key: any) => () => SortedHandlers.sortBy(key);

    const total = useMemo(() => Math.ceil(data.length / ChunkValues.size), [data.length, ChunkValues.size]);
    const header = useMemo(() => columns.map((e, index) => (
        <ListHeaderButton
            key={index}
            label={e.name}
            sort={{ onSort: sort(e.key), sorted: SortValues.sortBy === e.key }}
        />
    )), [columns, SortValues.sortBy]);

    const memoizeRows = useMemo(() => chunkData[page - 1]?.map((row) => rows(row)) || [], [rows, chunkData, page]);

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => FilterHandlers.setFilterText(event.target.value);
    const handlePageChange = (value: number) => setPage(value);

    return (
        <>
            <ModularBox>
                <SearchInputText placeholder="Buscar" value={FilterValues.text} onChange={handleSearchInput} />
            </ModularBox>

            <ModularBox flex={1}>
                <Flex className={classes.header} w='100%'>
                    {SortValues.sortBy && (
                        <UnstyledButton className={classes.control} data-active={true} onClick={() => SortedHandlers.sortBy(null)} h='100%'>
                            <Center className={classes.icon}>
                                <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            </Center>
                        </UnstyledButton>
                    )}
                    {header}
                </Flex>
                <ScrollArea mah={325}>
                    <Flex gap={rem(8)} direction='column'>
                        {memoizeRows}
                    </Flex>
                </ScrollArea>
            </ModularBox>

            {total > 1 && (
                <ModularBox justify='center' align='center'>
                    <Pagination
                        total={total}
                        color="orange"
                        size="sm"
                        value={page}
                        radius='xl'
                        onChange={handlePageChange}
                        withEdges
                    />
                </ModularBox>
            )}
        </>
    );
};

export { ListLayout }