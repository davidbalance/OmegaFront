'use client'

import { getErrorMessage } from '@/lib/utils/errors';
import { defaultClientEmail } from '@/server/medical_client/actions';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useState } from 'react'

interface EmailDefaultActionProps {
  patientDni: string;
  emailId: string;
  emailDefault: boolean;
}
const EmailDefaultAction: React.FC<EmailDefaultActionProps> = ({
  patientDni,
  emailId,
  emailDefault
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useCallback(
    async () => {
      setLoading(true);
      try {
        await defaultClientEmail({ emailId, patientDni });
      } catch (error: any) {
        notifications.show({ message: getErrorMessage(error), color: 'red' });
      } finally {
        setLoading(false);
      }
    }, [patientDni, emailId]);


  return (
    <Button
      variant='transparent'
      color={emailDefault ? 'orange' : 'neutral'}
      loading={loading}
      onClick={handleClick}
    >
      {emailDefault ? 'Correo por defecto' : 'No establecido'}
    </Button>
  )
}

export default EmailDefaultAction