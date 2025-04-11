'use client'
import { getErrorMessage } from '@/lib/utils/errors';
import { removeClientEmail } from '@/server';
import { ActionIcon, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import React, { useCallback, useState } from 'react'

interface EmailDeleteActionProps {
  patientDni: string;
  emailId: string;
}
const EmailDeleteAction: React.FC<EmailDeleteActionProps> = ({
  emailId,
  patientDni
}) => {

  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      await removeClientEmail({ emailId, patientDni });
    } catch (error: any) {
      notifications.show({ message: getErrorMessage(error), color: 'red' });
    } finally {
      setLoading(false);
    }
  }, [emailId, patientDni])

  return (
    <ActionIcon
      variant='transparent'
      loading={loading}
      onClick={handleClick}
    >
      <IconTrash style={{ width: rem(16), height: rem(16) }} />
    </ActionIcon>
  )
}

export default EmailDeleteAction