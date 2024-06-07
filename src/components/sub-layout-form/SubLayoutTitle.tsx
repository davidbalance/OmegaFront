import { Grid, Title, ActionIcon, Flex, Text } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import React from 'react'
import { ModularBox } from '../modular-box/ModularBox';

type SubLayoutFormTitleProps = {
    title: string;
    onClose: () => void;
}
const SubLayoutFormTitle: React.FC<SubLayoutFormTitleProps> = ({ title, onClose }) => {
    return <ModularBox direction='row' justify='space-between' align='center'>
        <Text
            p={0}
            fw={500}
            tt="uppercase"
            component='h6'
            c="omegaColors">
            {title}
        </Text>
        <Flex justify='center' align='center'>
            <ActionIcon variant='transparent' onClick={onClose} size='sm'>
                <IconX />
            </ActionIcon>
        </Flex>
    </ModularBox>
}

export { SubLayoutFormTitle }