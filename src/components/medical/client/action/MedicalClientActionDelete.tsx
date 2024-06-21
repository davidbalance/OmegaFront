import { useFetch } from '@/hooks/useFetch';
import { ActionIcon, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback, useEffect, useState } from 'react'

interface MedicalClientActionDeleteProps {
  id: number;
  onClick?: () => void;
  onComplete?: (id: number) => void
}
const MedicalClientActionDelete: React.FC<MedicalClientActionDeleteProps> = ({ id, onClick, onComplete }) => {

  const {
    data,
    error,
    loading,
    reload,
    reset
  } = useFetch<any>(`/api/medical/client/email/${id}`, 'DELETE', { loadOnMount: false });

  const handleClickEvent = useCallback(() => {
    onClick?.();
    reload();
  }, [onClick, reload])

  useEffect(() => {
    if (error) notifications.show({ message: error.message, color: 'red' });
  }, [error]);

  useEffect(() => {
    if (data) {
      onComplete?.(id);
      reset()
    }
  }, [id, data, onComplete, reset]);


  return (
    <ActionIcon
      variant='transparent'
      loading={loading}
      onClick={handleClickEvent}
    >
      <IconTrash style={{ width: rem(16), height: rem(16) }} />
    </ActionIcon>
  )
}

export { MedicalClientActionDelete }