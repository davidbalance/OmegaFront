'use client'

import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx';
import { UnstyledButton, Flex, Center, rem } from '@mantine/core'
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import classes from './orderable-button.module.css'

interface OrderableButtonProps {
    children: React.ReactNode;
    field: string;
    owner?: string;
}

const ownerKey: string = 'owner';
const fieldKey: string = 'field';
const orderKey: string = 'order';

const OrderableButton: React.FC<OrderableButtonProps> = ({
    children,
    owner: ownerValue,
    field,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const owner = searchParams.get(ownerKey);
    const value = searchParams.get(fieldKey);
    const order = searchParams.get(orderKey);

    const isActive = value === field && (!ownerValue || owner === ownerValue);
    const Icon = isActive ? (order === 'asc' ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleClick = () => {
        const newQuery = new URLSearchParams(searchParams);

        if (isActive) {
            if (order === 'asc') {
                newQuery.set(orderKey, 'desc');
            } else {
                newQuery.delete(fieldKey);
                newQuery.delete(orderKey);
                if (ownerValue) newQuery.delete(ownerKey);
            }
        } else {
            if (ownerValue) newQuery.set(ownerKey, ownerValue);
            newQuery.set(fieldKey, field);
            newQuery.set(orderKey, 'asc');
        }

        router.push(`${pathname}?${newQuery.toString()}`);
    };

    return (
        <UnstyledButton
            onClick={handleClick}
            className={clsx(classes.control, { [classes.order]: isActive })}>
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