import { Box, Flex, Loader, Pagination, ScrollArea, Table, Text } from '@mantine/core'
import React, { useState } from 'react'
import cx from 'clsx';
import classes from './OmegaTable.module.css';
import { OmegaTd } from '../omega-td/OmegaTd';
import { useMediaQuery } from '@mantine/hooks';

type OmegaTableProps = {
    /**
     * Componentes de react que forman el encabezado de la tabla.
     */
    header: React.ReactNode;
    /**
     * Arreglo de componentes de react que forman el cuerpo de la tabla.
     */
    rows: React.JSX.Element[];
    /**
     * Total de items.
     */
    total: number;
    /**
     * Pagina actual.
     */
    page: number;
    /**
     * Estado de carga.
     */
    loading?: boolean;
    /**
     * Funcion que es invocada cuando se llama al evento de cambio de pagina.
     * @param value 
     * @returns 
     */
    onPageChange: (value: number) => void;
}
const OmegaTable: React.FC<OmegaTableProps> = ({ header, rows, total, page, onPageChange, loading = false }) => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    const matches = useMediaQuery("(min-width: 700px)");

    const scrollAreaHeight = matches
        ? 400
        : 300

    return (
        <Box className={classes.outer}>
            <ScrollArea h={scrollAreaHeight} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table horizontalSpacing="md" verticalSpacing="xs" layout='auto'>
                    <Table.Thead className={cx(classes.sticky, { [classes.scrolled]: scrolled })} c='omegaColors'>
                        <Table.Tr>
                            {header}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0
                            ? (rows)
                            : (
                                <Table.Tr>
                                    <OmegaTd colSpan={4}>
                                        {
                                            loading ?
                                                <Flex justify='center' align='center'>
                                                    <Loader size='sm' m='md' />
                                                    <Text>Cargando recursos...</Text>
                                                </Flex>
                                                : <Text ta="center">
                                                    Datos no encontrados
                                                </Text>
                                        }
                                    </OmegaTd>
                                </Table.Tr>
                            )}
                    </Table.Tbody>
                </Table>
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
        </Box >
    )
}

export { OmegaTable };