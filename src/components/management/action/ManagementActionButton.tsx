import { Menu, MenuTarget, Flex, ActionIcon, rem, MenuItem, MenuItemProps } from '@mantine/core'
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { deleteManagementFunctionalityWithContext } from '../hoc/deleteManagementHOC';
import { useDisclosure } from '@mantine/hooks';
import { DeleteManagementProvider } from '../context/delete-management.context';
import { Management } from '@/lib/dtos/location/management/base.response.dto';

const EnhancedDeleteItem = deleteManagementFunctionalityWithContext<MenuItemProps>(MenuItem);

interface ManagementActionButtonProps {
    management: Management;
    onModification: () => void;
    onDelete: () => void;
}
const ManagementActionButton: React.FC<ManagementActionButtonProps> = ({ management, onDelete, onModification }) => {

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

    return (
        <DeleteManagementProvider>
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
                        onClick={handleModificationEvent}
                        leftSection={(
                            <IconPencil style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Modificacion
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Danger zone</Menu.Label>
                    <EnhancedDeleteItem
                        onStart={handleStart}
                        onError={handleError}
                        onEnd={handleDeleteEvent}
                        management={management}
                        color="red"
                        leftSection={(
                            <IconTrash style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Eliminar
                    </EnhancedDeleteItem>
                </Menu.Dropdown>
            </Menu>
        </DeleteManagementProvider>
    )
}

export { ManagementActionButton }