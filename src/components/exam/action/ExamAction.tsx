import React, { useCallback } from 'react'
import { ActionIcon, Flex, Menu, MenuTarget, rem } from '@mantine/core'
import { IconDotsVertical, IconExchange } from '@tabler/icons-react'

interface ExamActionButtonProps {
    onChangeExamSubtype: () => void;
}

const ExamAction: React.FC<ExamActionButtonProps> = ({ onChangeExamSubtype }) => {

    const handleChangeExamSubtypeEvent = useCallback(() => {
        onChangeExamSubtype();
    }, [onChangeExamSubtype]);

    return (
        <Menu>
            <MenuTarget>
                <Flex justify='center'>
                    <ActionIcon variant="transparent">
                        <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Flex>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Label>Aplicacion</Menu.Label>
                <Menu.Item
                    onClick={handleChangeExamSubtypeEvent}
                    leftSection={(
                        <IconExchange style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Cambiar tipo de examen
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default ExamAction