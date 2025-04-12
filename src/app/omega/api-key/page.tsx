import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import CreateApiKeyForm from './_components/create_api_key_form'
import ListRoot from '@/components/_base/list/list-root'
import ApiKeyHeader from './_components/api_key_header'
import ApiKeyProvider from './_context/api_key.context'
import { retriveApiKeys } from '@/server'
import ApiKeyList from './_components/api_key_list'
import ApiKeyModal from './_components/api_key_modal'

<<<<<<< HEAD
const OmegaApikey: React.FC = async () => {

  const apikeys = await retriveApiKeys();

  return (
    <>
      <ModularBox>
        <ApiKeyProvider>
          <CreateApiKeyForm />
          <ApiKeyModal />
        </ApiKeyProvider>
      </ModularBox>
      <ModularBox flex={1}>
        <ListRoot>
          <ApiKeyHeader />
          <ApiKeyList apikeys={apikeys} />
        </ListRoot>
      </ModularBox>
    </>
=======
import ApiKeyFormCreate from '@/components/api-key/form/ApiKeyFormCreate';
import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListElement } from '@/components/layout/list-layout/types';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { ApiKey } from '@/lib/dtos/auth/api/key/base.response.dto';
import { Flex, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutStates {
  DEFAULT
}

const columnsApiKey: ListElement<ApiKey>[] = [
  { key: 'name', name: 'Api Keys' }
];

const ApiKeyPage = () => {

  const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

  const {
    data,
    error,
    loading
  } = useFetch<ApiKey[]>('/api/key', 'GET');

  const [apiKeys, {
    append: apiKeyAppend,
    override: apiKeyOverride
  }] = useList<ApiKey>([]);

  const handleFormSubmittion = useCallback((value: ApiKey) => {
    apiKeyAppend(value);
  }, [apiKeyAppend]);

  const handleDataRows = useCallback((row: ApiKey) => (
    <ListRow key={`${row.id}-${row.name}`}>
      {row.name}
    </ListRow>
  ), []);

  useEffect(() => {
    if (data) apiKeyOverride(data);
  }, [data, apiKeyOverride]);

  useEffect(() => {
    if (error) notifications.show({ message: error.message, color: 'red' });
  }, [error]);

  const view = useMemo(() => ({
    [LayoutStates.DEFAULT]: (
      <Flex h='100%' direction='column' gap={rem(8)}>
        <ApiKeyFormCreate
          onFormSubmittion={handleFormSubmittion} />
        <ListLayout<ApiKey>
          loading={loading}
          columns={columnsApiKey}
          data={apiKeys}
          rows={handleDataRows}
          size={50} />
      </Flex>
    )
  }), [
    loading,
    apiKeys,
    handleDataRows,
    handleFormSubmittion
  ]);

  return (
    <>{view[currentState]}</>
>>>>>>> main
  )
}

export default OmegaApikey