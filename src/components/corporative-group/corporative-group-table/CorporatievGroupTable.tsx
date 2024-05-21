import { Box, ScrollArea, Flex, Loader, Text, Pagination, SimpleGrid, Paper, rem } from '@mantine/core';
import React from 'react'
import classes from './CorporatievGroupCollapsableRow.module.css'

type CorporativeGroupTableProps = {
    header: React.ReactElement[];
    rows: React.ReactElement[];
    total: number;
    page: number;
    onPageChange: (value: number) => void;
    loading?: boolean;
    height?: number;
}
const CorporativeGroupTable: React.FC<CorporativeGroupTableProps> = ({ header, rows, total, page, onPageChange, height = 400, loading = false }) => {
    return <>
        <Paper mb={rem(16)} style={{ boxShadow: 'none', overflow: 'hidden' }} bg="omegaColors" radius="lg">
            <SimpleGrid cols={header.length} >
                {header}
            </SimpleGrid>
        </Paper>
        <Box className={classes.outer}>
            <ScrollArea h={height}>
                <SimpleGrid cols={1} spacing='sm'>
                    {
                        rows.length > 0
                            ? (rows)
                            : loading ?
                                <Flex justify='center' align='center' c='omegaColors'>
                                    <Loader size='sm' m='md' />
                                    <Text size='xs'>Cargando recursos...</Text>
                                </Flex>
                                : <Text
                                    ta="center"
                                    size='xs'>
                                    Datos no encontrados
                                </Text>
                    }
                </SimpleGrid>

            </ScrollArea>
            {
                Math.floor(total) !== 0 && <div className={classes.pagination}>
                    <Pagination
                        total={total}
                        color="omegaColors"
                        size="sm"
                        value={page}
                        radius='xl'
                        onChange={onPageChange}
                        withEdges />
                </div>
            }
        </Box>
    </>;
}

export { CorporativeGroupTable }