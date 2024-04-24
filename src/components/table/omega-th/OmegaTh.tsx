import { Center, Group, Table, UnstyledButton, rem, Text } from '@mantine/core';
import React from 'react'
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import classes from './OmegaTh.module.css'

type OmegaTh = {
    children: React.ReactNode;
    sort?: {
        sorted: boolean;
        onSort: () => void;
    }
}

const OmegaTh: React.FC<OmegaTh> = ({ children, sort }) => {

    const [reversed, { toggle }] = useDisclosure(false);
    const Icon = sort?.sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleSortClick = () => {
        toggle();
        sort?.onSort();
    }

    return (
        <Table.Th className={classes.th}>
            {sort
                ? <UnstyledButton onClick={handleSortClick} className={classes.control}>
                    <Group justify="space-between">
                        <Text fw={500} fz="sm">
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
                : <Text fw={500} fz="sm">
                    {children}
                </Text>
            }
        </Table.Th>
    )
}

export default OmegaTh