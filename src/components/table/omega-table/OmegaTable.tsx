import { Flex, Loader, Pagination, ScrollArea, Table, Text } from '@mantine/core'
import React, { useState } from 'react'
import cx from 'clsx';
import classes from './OmegaTable.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

type OmegaTableProps = {
    header: React.ReactNode;
    rows: React.JSX.Element[];
    total: number;
    page: number;
    onPageChange: (value: number) => void;
    loading?: boolean;
    height?: number;
}
const OmegaTable: React.FC<OmegaTableProps> = ({ header, rows, total, page, onPageChange, height = 400, loading = false }) => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    return (
        <>
            <ScrollArea h={height} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
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
                                    <Table.Td colSpan={4}>
                                        {
                                            loading ?
                                                <Flex justify='center' align='center' c='omegaColors'>
                                                    <Loader size='sm' m='md' />
                                                    <Text size='xs'>Cargando recursos...</Text>
                                                </Flex>
                                                : <Text fw={500} ta="center">
                                                    Nothing found
                                                </Text>
                                        }
                                    </Table.Td>
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
        </>
    )
}

export default OmegaTable