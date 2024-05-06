import { UnstyledButton, Group, Center, rem, Box, Text, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
import React from 'react'
import classes from './PatientTh.module.css'

type PatientThProps = {
    children: React.ReactNode;
    sort?: {
        sorted: boolean;
        onSort: () => void;
    }
}
const PatientTh: React.FC<PatientThProps> = ({ children, sort }) => {
    const [reversed, { toggle }] = useDisclosure(false);
    const Icon = sort?.sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleSortClick = () => {
        toggle();
        sort?.onSort();
    }

    return (
        <Box className={classes.th}>
            {sort
                ? <UnstyledButton onClick={handleSortClick} className={classes.control}>
                    <Group justify="space-between">
                        <Text size='sm' fw={500} fz="sm">
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
                : <Flex align='center'>
                    <Text size='sm' fw={500} fz="sm">
                    {children}
                </Text>
                </Flex>
            }
        </Box>
    )
}

export default PatientTh