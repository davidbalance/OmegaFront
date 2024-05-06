import { Box, ScrollArea, Flex, Loader, Text, Pagination, SimpleGrid, Paper, rem } from '@mantine/core';
import React, { useState } from 'react'
import classes from './PatientTable.module.css'
import cx from 'clsx'

type PatientTableProps = {
    header: React.ReactElement[];
    rows: React.ReactElement[];
    total: number;
    page: number;
    onPageChange: (value: number) => void;
    loading?: boolean;
    height?: number;
}
const PatientTable: React.FC<PatientTableProps> = ({ header, rows, total, page, onPageChange, height = 400, loading = false }) => {

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

export { PatientTable }