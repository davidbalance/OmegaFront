import { Menu, MenuTarget, Flex, ActionIcon, rem, MenuItem, MenuItemProps } from '@mantine/core'
import { IconDotsVertical, IconExchange, IconPencil, IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Area } from '@/lib/dtos/location/area/response.dto';
import { deleteAreaFunctionalityWithContext } from '../hoc/deleteAreaHOC';
import { DeleteAreaProvider } from '../context/delete-area.context';

const EnhancedDeleteItem = deleteAreaFunctionalityWithContext<MenuItemProps>(MenuItem);

interface AreaActionButtonProps {
    area: Area;
    onDelete: () => void;
    onModification: () => void;
    onChangeManagement: () => void;
}
const AreaActionButton: React.FC<AreaActionButtonProps> = ({ area, onDelete, onModification, onChangeManagement }) => {

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
    
    const handleChangeManagementEvent = useCallback(() => {
        onChangeManagement();
    }, [onChangeManagement]);

    return (
        <DeleteAreaProvider>
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
                        onClick={handleChangeManagementEvent}
                        leftSection={(
                            <IconExchange style={{ width: rem(16), height: rem(16) }} />
                        )}>
                        Cambiar gerencia
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
                        area={area}
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
        </DeleteAreaProvider>
    )
}

export { AreaActionButton }