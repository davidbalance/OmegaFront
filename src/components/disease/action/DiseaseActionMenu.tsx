import { Menu, MenuTarget, ActionIcon, rem } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconExchange, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

interface DiseaseActionMenuProps {
    /**
     * Funcion que es llamada cuando se solicita el cambio de grupo de la morbilidad.
     * @returns 
     */
    onGroupModification: () => void;
    /**
     * Funcion que es llamada cuando se solicita la modificacion de la morbilidad.
     * @returns 
     */
    onModification: () => void;
    /**
     * Funcion que es llamada cuando se solicita la eliminacion de una morbilidad.
     * @returns 
     */
    onDelete: () => void;
}
const DiseaseActionMenu: React.FC<DiseaseActionMenuProps> = ({ onModification, onGroupModification, onDelete }) => {

    const handleClickEventGroupModification = useCallback(() => onGroupModification(), [onGroupModification]);
    const handleClickEventModification = useCallback(() => onModification(), [onModification]);
    const handleClickEventDelete = useCallback(() => onDelete(), [onDelete]);

    return (
        <Menu withArrow>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={handleClickEventGroupModification}
                    leftSection={<IconExchange style={{ width: rem(16), height: rem(16) }} />}
                >
                    Cambiar grupo
                </Menu.Item>
                <Menu.Item
                    onClick={handleClickEventModification}
                    leftSection={<IconEdit style={{ width: rem(16), height: rem(16) }} />}
                >
                    Editar morbilidad
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    onClick={handleClickEventDelete}
                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} />}
                >
                    Eliminar morbilidad
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default DiseaseActionMenu