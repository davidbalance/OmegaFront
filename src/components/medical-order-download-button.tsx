'use client'

import { blobFile } from '@/lib/utils/blob-to-file';
import { updateMedicalOrderStatus } from '@/server/medical-order.actions';
import { ActionIcon, rem, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDownload } from '@tabler/icons-react';
import React, { useCallback, useState } from 'react'

const processBlob = async (id: number) => {
  const response = await fetch(`/api/medical/file/order/${id}`);
  if (!response.ok) {
    const reason = await response.json();
    throw new Error(reason);
  }
  const blob = await response.blob();
  blobFile(blob, `${id.toString().padStart(9, '0')}.pdf`)
}

interface MedicalOrderDownloadButtonProps {
  id: number;
}

const MedicalOrderDownloadButton: React.FC<MedicalOrderDownloadButtonProps> = ({
  id
}) => {

  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      await processBlob(id);
    } catch (error: any) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setLoading(false);
    }
  }, [id]);

  return (
    <Tooltip
      label='Descargar'>
      <ActionIcon
        loading={loading}
        onClick={handleClick}>
        <IconDownload style={{ width: rem(16), height: rem(16), lineHeight: rem(1.5) }} />
      </ActionIcon>
    </Tooltip>
  )
}

export default MedicalOrderDownloadButton;