'use client'

import React from 'react'
import TableTh from './table-th';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import { UnstyledButton, Flex, Center, rem, Text } from '@mantine/core';

import classes from './table.module.css'

export interface TableOrderableThProps {
    children: React.ReactNode;
    field: string;
    key?: string;
    order?: string;
}

const TableOrderableTh: React.FC<TableOrderableThProps> = ({
    key = 'order',
    children,
    field,
    order
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();

    const Icon = (order && order.split('-')[0] === field) ? (order === `${field}-asc` ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleClick = () => {
        const newQuery = new URLSearchParams(query.toString());
        let currentOrder: string | undefined = undefined;
        if (order) {
            const currentField = order.split('-')[0];
            if (currentField === field) {
                currentOrder = order.split('-')[1];
            }
        }
        if (!currentOrder) {
            newQuery.set(key, `${field}-asc`);
        } else if (currentOrder === `asc`) {
            newQuery.set(key, `${field}-desc`);
        } else {
            newQuery.delete(key);
        }
        router.push(`${pathname}?${newQuery.toString()}`);
    }

    return (
        <TableTh>
            <UnstyledButton
                onClick={handleClick}
                className={clsx(classes.control, { [classes.order]: order && order.split('-')[0] === field })}>
                <Flex justify="space-between" align='center'>
                    <Text className={classes.text} fw={500}>
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Flex>
            </UnstyledButton>
        </TableTh>
    )
}

export default TableOrderableTh