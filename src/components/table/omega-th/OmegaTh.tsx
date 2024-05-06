import { Center, Group, Table, UnstyledButton, rem, Text, Flex } from '@mantine/core';
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
                    <Flex justify="space-between" align='center'>
                        <Text size='xs' fw={500}>
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </Center>
                    </Flex>
                </UnstyledButton>
                : <Text size='xs' fw={500}>
                    {children}
                </Text>
            }
        </Table.Th>
    )
}

export default OmegaTh