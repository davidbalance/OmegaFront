import { ActionIcon, Menu } from '@mantine/core';
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
            <Menu.Target>
                <ActionIcon
                    variant="transparent"
                    loading={loading}>
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {children}
            </Menu.Dropdown>
        </Menu>
    )
}

export default ActionMenu