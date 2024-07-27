import React, { useCallback } from 'react'
import { DeleteExamSubtypeProvider } from '../context/delete-exam-subtype-context'
import { ActionIcon, Flex, Menu, MenuItem, MenuItemProps, MenuTarget, rem } from '@mantine/core'
import { IconDotsVertical, IconExchange, IconPencil, IconTrash } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { deleteExamSubtypeFunctionalityWithContext } from '../hoc/deleteExamSubtypeHOC'
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto'

const EnhancedDeleteItem = deleteExamSubtypeFunctionalityWithContext<MenuItemProps>(MenuItem);


interface ExamSubtypeActionButtonProps {
    examSubtype: ExamSubtype;
    onDelete: () => void;
    onModification: () => void;
    onChangeExamType: () => void;
}

const ExamSubtypeAction: React.FC<ExamSubtypeActionButtonProps> = ({ examSubtype, onDelete, onModification, onChangeExamType }) => {

    const [loading, {
        open: loadOpen,
        close: loadClose
    }] = useDisclosure(false);

    const handleError = useCallback(() => {
        loadClose();
    }, [loadClose]);

    const handleStart = useCallback(() => {
        loadOpen();
    }, [loadOpen]);

    const handleDeleteEvent = useCallback(() => {
        loadClose();
        onDelete();
    }, [loadClose, onDelete]);

    const handleModificationEvent = useCallback(() => {
        onModification();
    }, [onModification]);

    const handleChangeExamTypeEvent = useCallback(() => {
        onChangeExamType();
    }, [onChangeExamType]);

    return (
        <DeleteExamSubtypeProvider>
            <Menu>
                <MenuTarget>
                    <Flex justify='center'>
                        <ActionIcon variant="transparent" loading={loading}>
                            <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Flex>
                </MenuTarget>
                <Menu.Dropdown>
                    <Menu.Label>Aplicacion</Menu.Label>
                    <Menu.Item
                        onClick={handleChangeExamTypeEvent}
                        leftSection={(
                            <IconExchange style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Cambiar tipo de examen
                    </Menu.Item>
                    <Menu.Item
                        onClick={handleModificationEvent}
                        leftSection={(
                            <IconPencil style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Modificacion
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Danger zone</Menu.Label>
                    <EnhancedDeleteItem
                        examSubtype={examSubtype}
                        color="red"
                        onStart={handleStart}
                        onError={handleError}
                        onEnd={handleDeleteEvent}
                        leftSection={(
                            <IconTrash style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Eliminar
                    </EnhancedDeleteItem>
                </Menu.Dropdown>
            </Menu>
        </DeleteExamSubtypeProvider>
    )
}

export default ExamSubtypeAction