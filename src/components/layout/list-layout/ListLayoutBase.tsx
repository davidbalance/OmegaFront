import { Center, Flex, Grid, Loader, Pagination, ScrollArea, Text, TextInputProps, UnstyledButton, rem } from '@mantine/core';
import React, { useCallback, useMemo, useState } from 'react'
import classes from './ListLayout.module.css'
import { IconX } from '@tabler/icons-react';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { ListHeaderButton } from './ListHeaderButton';
import { useMediaQuery } from '@mantine/hooks';
import { InputSearch } from '@/components/input/search/InputSearch';

export interface ListElement<T> {
    key: keyof T;
    name: string;
}

export interface ListLayoutBaseProps<T> {
    /**
     * Elementos de react que hacen de filas.
     */
    data: React.ReactElement[];
    /**
     * Numero total de paginas
     */
    total: number;
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
     * Elementos adicionales, se posicionaran a un lado del area de busqueda.
     */
    dock?: React.ReactElement | React.ReactElement[];
    /**
     * Llave que esta siendo ordenada
     */
    sort: keyof T | null;
    /**
     * Funcion que es invocada cuando se realiza un click a un boton en el encabezado
     * @param key 
     * @returns 
     */

    onSort: (key: keyof T | null) => void
    /**
     * Funcion que es invocada al momento de cambiar una pagina
     * @param page 
     * @returns 
     */
    onPageChange: (page: number) => void;

    /**
     * Props para el campo de busqueda
     */
    searchProps: TextInputProps
}

const ListLayoutBase = <T extends object>({ data, total, loading, columns, height = 350, sort, onSort, dock, onPageChange, searchProps }: ListLayoutBaseProps<T>): React.ReactElement | null => {

    const [page, setPage] = useState<number>(1);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const handleSortEvent = useCallback((key: keyof T) => () => onSort(key), [onSort]);
    const handleUnsortEvent = useCallback(() => onSort(null), [onSort]);

    const header = useMemo(
        () =>
            columns.map((e) => (
                <ListHeaderButton
                    key={String(e.key)}
                    label={e.name}
                    sort={{ onSort: handleSortEvent(e.key), sorted: sort === e.key }}
                />
            )),
        [columns, sort, handleSortEvent]
    );

    const handlePageChange = useCallback((value: number) => {
        setPage(value);
        onPageChange?.(value);
    }, [onPageChange]);

    return (
        <Flex direction='column' gap={rem(8)} h='100%'>
            <ModularBox>
                <Grid>
                    <Grid.Col span={dock ? (isMobile ? 11 : 8) : 12}  >
                        <InputSearch
                            placeholder="Buscar"
                            {...searchProps}
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
                    {sort && (
                        <UnstyledButton
                            className={classes.control}
                            data-active={true}
                            onClick={handleUnsortEvent}
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
                ) : data.length === 0 ? (
                    <Text ta="center">No hay datos agregados</Text>
                ) : (
                    <ScrollArea h={height} px={rem(4)} className={classes['item-container']}>
                        <Flex gap={rem(2)} direction="column">
                            {data}
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
                            siblings={1}
                            value={page}
                            radius="xl"
                            onChange={handlePageChange}
                            // withEdges
                        />
                    </ModularBox>
                )
            }
        </Flex>
    );
};

export { ListLayoutBase };