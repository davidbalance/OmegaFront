// 'use client'

import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { ApiKey } from '@/lib/dtos/api/key/response.dto';
import { Title, Button, Modal, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

enum LayoutState {
  DEFAULT
}

const apiKeyColumns: ListElement<ApiKey>[] = [
    { key: 'name', name: 'Name' },
];

type ApiKeyDataType = ApiKey & { id: number };

const parseApiKeys = (apiKeys: ApiKey[]): ApiKeyDataType[] => apiKeys.map<ApiKeyDataType>((e) => ({
    id: e.id,
    name: e.name,
}));

const ApiKeyPage: React.FC = () => {
    const [active, setActive] = useState(0);
    const [currentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [newApiKey, setNewApiKey] = useState<string | null>(null);
    const [apiKeys, setApiKeys] = useState<ApiKeyDataType[]>([]);
    const [modalOpened, setModalOpened] = useState(false);

    const {
        data: fetchedApiKeys,
        loading: apiKeyLoading,
        error: apiKeyError,
    } = useFetch<ApiKey[]>('/api/api-key', 'GET');

    const [parsedApiKeys, setParsedApiKeys] = useState<ApiKeyDataType[]>([]);

    useEffect(() => {
        if (fetchedApiKeys) {
            setParsedApiKeys(parseApiKeys(fetchedApiKeys));
        }
    }, [fetchedApiKeys]);

    useEffect(() => {
        if (apiKeyError) {
            notifications.show({ message: apiKeyError.message, color: 'red' });
        }
    }, [apiKeyError]);

    const handleApiKeyRow = useCallback((row: ApiKeyDataType) => (
        <ListRowElement key={row.id}>
            <Title order={6}>{row.name}</Title>
        </ListRowElement>
    ), []);

    const handleCreateApiKey = async () => {
        try {
            const response = await fetch('/api/api-key', { method: 'POST' });
            const data = await response.json();
            setNewApiKey(data.key);
            setApiKeys([...apiKeys, { id: apiKeys.length, name: data.name }]);
            setModalOpened(true);
        } catch (error) {
            notifications.show({ message: 'Fallo al crear API Key', color: 'red' });
        }
    };

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'API Keys',
            element: (
                <ListLayout<ApiKeyDataType>
                    key='apikey-list-layout'
                    loading={apiKeyLoading}
                    data={parsedApiKeys}
                    columns={apiKeyColumns}
                    rows={handleApiKeyRow}
                    size={100}
                />
            ),
        },
    ], [apiKeyLoading, parsedApiKeys, handleApiKeyRow]);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={() => {}}
            />
        ),
    }), [multipleLayerComponents, active]);

    return (
        <>
            <Button onClick={handleCreateApiKey}>Create API Key</Button>
            <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="API Key">
                <TextInput
                    label="API Key"
                    readOnly
                />
            </Modal>
            {view[currentState]}
        </>
    );
};

export default ApiKeyPage;


