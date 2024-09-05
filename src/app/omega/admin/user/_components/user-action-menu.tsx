'use client'

import ActionMenu from '@/components/_base/action-menu'
import React from 'react'
import { useActionUser } from '../../../../../contexts/action-menu.context'

const UserActionMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { load } = useActionUser();

    return (
        <ActionMenu loading={load}>
            {children}
        </ActionMenu>
    )
}

export default UserActionMenu