'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { ActionIcon, Menu, MenuDropdown, MenuTarget } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React from 'react'

export interface ActionMenuProps {
    children?: React.ReactNode
}

const ActionMenu: React.FC<ActionMenuProps> = ({ children }) => {

    const { load } = useActionMenu();

    return (
        <Menu>
            <MenuTarget>
                <ActionIcon
                    variant="transparent"
                    loading={load}>
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