'use client'

import { ActionIcon, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react'
import React, { useState } from 'react'
import { deleteEmail } from '../../../../_actions/medical-email.actions';

interface MedicaEmailActionDeleteProps {
  email: number;
}
const MedicaEmailActionDelete: React.FC<MedicaEmailActionDeleteProps> = ({ email }) => {

  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async (id: number) => {
    setLoading(true);
    try {
      await deleteEmail(id);
    } catch (error: any) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ActionIcon
      variant='transparent'
      loading={loading}
      onClick={() => handleClick(email)}
    >
      <IconTrash style={{ width: rem(16), height: rem(16) }} />
    </ActionIcon>
  )
}

export { MedicaEmailActionDelete }