'use client'

import { LoadingOverlay, Box, SimpleGrid, rem, Button } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import React, { FormEvent, useState } from 'react'
import { ModularBox } from '../../../../components/modular/box/ModularBox'
import { notifications } from '@mantine/notifications'
import { blobFile } from '@/lib/utils/blob-to-file'
import dayjs from 'dayjs'
import { parseForm } from '@/lib/utils/form-parse'

const processBlob = async (body: any) => {
  const response = await fetch(`/api/medical/file/tree`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  });
  if (!response.ok) {
    const reason = await response.json();
    console.error(reason);
    throw new Error('Something went wrong during the download');
  }
  const blob = await response.blob();
  blobFile(blob, `${dayjs().format('YYYY_MM_DD_HH:mm:ss')}.zip`)
}


interface FileTreeDownloaderFormProps {
  children: React.ReactNode
}
const FileTreeDownloaderForm: React.FC<FileTreeDownloaderFormProps> = ({
  children
}) => {

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values: any = parseForm(event.currentTarget);
    setLoading(true);
    try {
      const processedValue = Object
        .entries(values)
        .filter(([, value]: [string, any]) => value.trim() !== '')
        .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});
      await processBlob(processedValue);
    } catch (error: any) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModularBox>
      <LoadingOverlay visible={false} />
      <Box
        onSubmit={handleSubmit}
        component='form'>
        <SimpleGrid
          cols={{ sm: 1, md: 3 }}
          spacing={rem(8)}>
          {children}
        </SimpleGrid>
        <Button
          mt='sm'
          type='submit'
          fullWidth
          size='xs'
          loading={loading}
          leftSection={(
            <IconDownload style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          )}>
          Descargar
        </Button>
      </Box>
    </ModularBox>
  )
}

export default FileTreeDownloaderForm