import { useFetch } from '@/hooks/useFetch';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/response.dto';
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect } from 'react'

interface MedicalClientActionDefaultProps {
  id: number;
  dni: string;
  state: boolean;
  onClick?: () => void;
  onComplete?: (data: MedicalClientEmail[]) => void;
}
const MedicalClientActionDefault: React.FC<MedicalClientActionDefaultProps> = ({ state, dni, id, onClick, onComplete }) => {

  const {
    data,
    error,
    loading,
    reload,
    reset
  } = useFetch<MedicalClientEmail[]>(`/api/medical/client/${dni}/email/${id}`, 'PATCH', { loadOnMount: false });

  const handleClickEvent = useCallback(() => {
    onClick?.();
    reload();
  }, [reload, onClick])

  useEffect(() => {
    if (error) notifications.show({ message: error.message, color: 'red' });
  }, [error]);

  useEffect(() => {
    if (data) {
      onComplete?.(data);
      reset();
    }
  }, [data, reset, onComplete]);

  return (
    <Button
      variant='transparent'
      color={state ? 'orange' : 'neutral'}
      loading={loading}
      onClick={handleClickEvent}
    >
      {state ? 'Correo por defecto' : 'No por establecido'}
    </Button>
  )
}

export { MedicalClientActionDefault }