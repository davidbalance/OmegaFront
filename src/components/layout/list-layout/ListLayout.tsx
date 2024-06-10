import { useChunk } from '@/hooks/useChunk';
import { useFilter } from '@/hooks/useFilter';
import { useSort } from '@/hooks/useSort';
import { Box, Center, Flex, Pagination, ScrollArea, Text, UnstyledButton, rem } from '@mantine/core';
import React, { ChangeEvent, useMemo, useState } from 'react'
import classes from './ListLayout.module.css'
import { IconChevronDown, IconChevronUp, IconSelector, IconX } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { SearchInputText } from '@/components/input/SearchInputText';
import cx from 'clsx';

export interface ListElement<T> {
    key: keyof T;
    name: string;
}

interface ListHeaderButtonProps {
    label: string;
    sort: {
        sorted: boolean;
        onSort: () => void;
    }
}
const ListHeaderButton: React.FC<ListHeaderButtonProps> = ({ label, sort }) => {
    const [reversed, { toggle }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 50em)');

    const Icon = sort?.sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleSortClick = () => {
        toggle();
        sort?.onSort();
    }

    return (
        <UnstyledButton className={classes.control} data-active={sort.sorted || undefined} onClick={handleSortClick} w='100%' h='100%'>
            <Flex justify="space-between" align='center'>
                <Text className={classes.text} fw={500} size={isMobile ? 'xs' : 'sm'}>
                    {label}
                </Text>
                <Center className={classes.icon}>
                    <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </Center>
            </Flex>
        </UnstyledButton>
    )
}

interface ListRowElementProps<T> {
    leftSection: React.ReactNode;
    children: React.ReactNode;
    rightSection: React.ReactNode;
    hover?: boolean;
    onClick?: () => void;
}

export const ListRowElement: <T extends object>(props: ListRowElementProps<T>) => React.ReactElement = ({ leftSection, rightSection, children, hover = true, onClick }) => {
    return (
        <Flex w='100%' gap={rem(20)} className={classes['list-element']}>
            {leftSection && <Flex align='center' key={`data-left-section`} className={classes['list-content']}>{leftSection}</Flex>}
            <UnstyledButton onClick={onClick} flex={1} className={cx(classes['list-content'], { [classes.clickable]: !!onClick, [classes.hoverable]: hover })}>
                {children}
            </UnstyledButton>
            {rightSection && <Flex align='center' key={`data-right-section`} className={classes['list-content']}>{rightSection}</Flex>}
        </Flex>);
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

    const total = useMemo(() => data.length / ChunkValues.size, [data, ChunkValues.size]);
    const header = useMemo(() => columns.map((e, index) => (<ListHeaderButton key={index} label={e.name} sort={{ onSort: sort(e.key), sorted: SortValues.sortBy === e.key }} />)), [columns, SortValues]);
    const memoizeRows = useMemo(() => chunkData[page - 1] ? chunkData[page - 1].map((row) => rows(row)) : [], [rows, chunkData, page]);

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        FilterHandlers.setFilterText(event.target.value);
    }

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    return (
        <>
            <ModularBox>
                <SearchInputText placeholder="Buscar" value={FilterValues.text} onChange={handleSearchInput} />
            </ModularBox>

            <ModularBox flex={1}>
                <Flex className={classes.header} w='100%'>
                    <UnstyledButton className={classes.control} data-active={true} onClick={() => SortedHandlers.sortBy(null)} h='100%'>
                        <Center className={classes.icon}>
                            <IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </Center>
                    </UnstyledButton>
                    {header}
                </Flex>
                <ScrollArea mah={325}>
                    <Flex gap={rem(8)} direction='column'>
                        {memoizeRows}
                    </Flex>
                </ScrollArea>
            </ModularBox>

            {
                Math.floor(total) !== 0 &&
                <ModularBox justify='center' align='center'>
                    <Pagination
                        total={total}
                        color="orange"
                        size="sm"
                        value={page}
                        radius='xl'
                        onChange={handlePageChange}
                        withEdges />
                </ModularBox>
            }


        </>
    )
}

export default ListLayout