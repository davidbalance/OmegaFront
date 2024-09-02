'use client'

import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react'
import { setEmailAsDefault } from '../../../../_actions/medical-email.actions';

interface MedicalEmailActionDefaultProps {
  id: number;
  state: boolean;
}
const MedicalEmailActionDefault: React.FC<MedicalEmailActionDefaultProps> = ({ id, state }) => {


  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async (id: number) => {
    setLoading(true);
    try {
      await setEmailAsDefault(id);
    } catch (error: any) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant='transparent'
      color={state ? 'orange' : 'neutral'}
      loading={loading}
      onClick={() => handleClick(id)}
    >
      {state ? 'Correo por defecto' : 'No establecido'}
    </Button>
  )
}

export { MedicalEmailActionDefault }