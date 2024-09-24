import { ModularBox } from '@/components/modular/box/ModularBox';
import { ActionIcon, Flex, Text } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import React from 'react'

type LayoutSubFormTitleProps = {
    /**
     * Titulo del formulario.
     */
    title: string;
    /**
     * Funcion que es invocada cuando se llama al evento de cierre.
     * @returns 
     */
    onClose: () => void;
}
const LayoutSubFormTitle: React.FC<LayoutSubFormTitleProps> = ({ title, onClose }) => {
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

export { LayoutSubFormTitle }