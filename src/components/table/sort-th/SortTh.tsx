import { Table, UnstyledButton, Group, Center, rem, Text } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
import React from 'react'
import classes from './SortTh.module.css'

interface SortThProps {
    /**
     * Elementos internos del componente.
     */
    children: React.ReactNode;
    /**
     * Indica la direccion del ordenamiento.
     */
    reversed: boolean;
    /**
     * Indica si la columna fue o no ordenada.
     */
    sorted: boolean;
    /**
     * Funcion que es invocada cuando se realiza un click a la columna.
     */
    onSort(): void;
}

const SortTh: React.FC<SortThProps> = ({ children, onSort, reversed, sorted }) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    )
}

export default SortTh