'use client'

import ActionMenu from '@/components/_base/action-menu'
import React from 'react'
import { useActionUser } from '../_context/action-user.context'

const UserActionMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { load } = useActionUser();

    return (
        <ActionMenu loading={load}>
            {children}
        </ActionMenu>
    )
}

export default UserActionMenu