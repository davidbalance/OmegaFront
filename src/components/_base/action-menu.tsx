import { ActionIcon, Menu, MenuDropdown, MenuTarget } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React from 'react'

export interface ActionMenuProps {
    loading?: boolean;
    children?: React.ReactNode
}

export type ExtendedActionProps<T> = ActionMenuProps & T;

const ActionMenu: React.FC<ActionMenuProps> = ({ loading = false, children }) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon
                    variant="transparent"
                    loading={loading}>
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <MenuDropdown>
                {children}
            </MenuDropdown>
        </Menu>
    )
}

export default ActionMenu