import { useFetch } from '@/hooks/useFetch';
import { Menu, MenuTarget, Flex, ActionIcon, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react'
import React, { useCallback, useEffect } from 'react'

interface DeveloperPagesActionMenuProps {
    /**
     * Identificador unico del recurso web.
     * @returns 
     */
    resource: number;
    /**
     * Funcion que es llamada cuando se realiza un click a la opcion de modificacion.
     * @returns 
     */
    onModification: () => void;
    /**
     * Funcion que es llamada cuando se realiza un click a la opcion de eliminacion.
     * @returns 
     */
    onDelete: (id: number) => void;
}
const DeveloperPagesActionMenu: React.FC<DeveloperPagesActionMenuProps> = ({ resource, onModification, onDelete }) => {

    const {
        data: fetchData,
        error: fetchError,
        loading: fetchLoading,
        reload: fetchReload,
        reset: fetchReset
    } = useFetch<any>(`/api/web/resources/${resource}`, 'DELETE', { loadOnMount: false });

    const handleClickEventDelete = useCallback(() => {
        fetchReload();
    }, [fetchReload]);

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    useEffect(() => {
        if (fetchData) {
            onDelete(resource);
            fetchReset();
        }
    }, [fetchData, onDelete, fetchReset, resource]);

    return (
        <Menu>
            <MenuTarget>
                <Flex justify='center'>
                    <ActionIcon
                        variant="transparent"
                        loading={fetchLoading}>
                        <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Flex>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconPencil style={{ width: rem(16), height: rem(16) }} />}
                    onClick={onModification}>
                    Modificacion
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} />}
                    onClick={handleClickEventDelete}
                    c='red'>
                    Eliminar
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { DeveloperPagesActionMenu }