'use client'

import ApiKeyDeleteDialog from '@/components/api-key/api-key-delete-dialog/ApiKeyDeleteDialog';
import ApiKeyLayout from '@/components/api-key/api-key-layout/ApiKeyLayout';
import { useApiKey } from '@/hooks/useApiKey';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'

enum LayoutStates {
  DEFAULT,
  UPDATE_KEY,
}
const ApiKeyPage = () => {

  const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

  const [deleteState, DeleteDisclosure] = useDisclosure();

  const apiKeyHook = useApiKey(true);

  const handleDeleteEvent = (index: number) => {
    apiKeyHook.selectItem(index);
    DeleteDisclosure.open();
  }

  const handleClose = () => {
    apiKeyHook.find();
    DeleteDisclosure.close();
    setCurrentState(LayoutStates.DEFAULT);
  }

  const view: Record<LayoutStates, React.ReactNode> = {
    [LayoutStates.UPDATE_KEY]: undefined,
    [LayoutStates.DEFAULT]: <>
      <ApiKeyDeleteDialog
        api={apiKeyHook.apiKey?.id || -1}
        opened={deleteState}
        onClose={handleClose} />

      <ApiKeyLayout
        load={apiKeyHook.loading}
        apiKeys={apiKeyHook.apiKeys}
        events={{
          onCreate: handleClose,
          onDelete: handleDeleteEvent
        }} />
    </>,
  }

  return (
    <>
      {
        view[currentState]
      }
    </>
  )
}

export default ApiKeyPage