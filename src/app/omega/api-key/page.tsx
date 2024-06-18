'use client'

import ApiKeyFormCreate from '@/components/api-key/form/ApiKeyFormCreate';
import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { ApiKey } from '@/lib/dtos/api/key/response.dto';
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
    <ListRowElement key={`${row.id}-${row.name}`}>
      {row.name}
    </ListRowElement>
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
  )
}

export default ApiKeyPage
