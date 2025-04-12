import { InputSearch } from '@/components/input/search/InputSearch';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Flex, rem, Grid, UnstyledButton, Center, Loader, ScrollArea, Pagination, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import React, { useCallback, useMemo, useState } from 'react'
import { ListHeader } from '../header/ListHeader';
import { ListLayoutBaseProps } from '../../types';
import classes from '../../styles/ListLayoutBase.module.css'

const ListLayoutBase = <T extends object>({ data, total, loading, columns, height = 350, sort, onSort, dock, onPageChange, searchProps }: ListLayoutBaseProps<T>): React.ReactElement | null => {

  const [page, setPage] = useState<number>(1);

  const isMobile = useMediaQuery('(max-width: 50em)');

  const handleSortEvent = useCallback((key: keyof T) => () => onSort(key), [onSort]);
  const handleUnsortEvent = useCallback(() => onSort(null), [onSort]);

  const header = useMemo(
    () =>
      columns.map((e) => (
        <ListHeader
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