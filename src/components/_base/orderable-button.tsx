'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { UnstyledButton, Flex, Center, rem } from '@mantine/core'
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import classes from './orderable-button.module.css'

interface OrderableButtonProps {
    children: React.ReactNode;
    field: string;
    key?: string;
    order?: string;
}

const OrderableButton: React.FC<OrderableButtonProps> = ({
    key = 'order',
    children,
    field,
    order
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return children;
    }

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
        <UnstyledButton
            onClick={handleClick}
            className={clsx(classes.control, { [classes.order]: order && order.split('-')[0] === field })}>
            <Flex justify="space-between" align='center'>
                {children}
                <Center className={classes.icon}>
                    <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </Center>
            </Flex>
        </UnstyledButton>
    )
}

export default OrderableButton