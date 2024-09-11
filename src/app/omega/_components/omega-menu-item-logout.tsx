'use client'

import { logout } from '@/server/account.actions'
import { MenuItem, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import React from 'react'

const OmegaMenuItemLogout: React.FC = () => {
    const handleLogout = async () => {
        try {
            await logout();
            await signOut({ callbackUrl: '/login' });
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        }
    }
    return (
        <MenuItem
            onClick={handleLogout}
            leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
            Cerrar Sesión
        </MenuItem>
    )
}

export default OmegaMenuItemLogout