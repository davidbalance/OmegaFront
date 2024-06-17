import { Header } from '@/components/header/Header'
import { useTable } from '@/hooks';
import { ApiKey } from '@/services/api/api-key';
import { Flex, Loader, Pagination, ScrollArea, Text, rem } from '@mantine/core';
import React, { useEffect } from 'react'
import ApiKeyCreate from '../api-key-create/ApiKeyCreate';
import ApiKeyItem from '../api-key-item/ApiKeyItem';
import { InputSearch } from '@/components/input/search/InputSearch';

type ApiKeyLayoutProps = {
    load?: boolean;
    apiKeys: ApiKey[]
    events: {
        onCreate: () => void;
        onDelete: (index: number) => void;
    }
}
const ApiKeyLayout: React.FC<ApiKeyLayoutProps> = ({ load, apiKeys, events }) => {

    const tableHook = useTable(apiKeys, 50);

    useEffect(() => {
        tableHook.setData(apiKeys);
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKeys]);


    const rows = tableHook.rows.map((row, index) => (
        <ApiKeyItem
            key={row.id}
            index={index}
            name={row.name}
            onDelete={() => events.onDelete(index)} />
    ));

    return (
        <>
            <Header>
                Mis api keys
            </Header>

            <ApiKeyCreate
                onCreate={events.onCreate} />

            <InputSearch
                placeholder="Buscar"
                value={tableHook.search}
                onChange={tableHook.onSearch}
            />

            <ScrollArea h={300}>
                {
                    load ?
                        <Flex justify='center' align='center'>
                            <Loader size='sm' m='md' />
                            <Text size='xs'>Cargando recursos...</Text>
                        </Flex>
                        : rows.length ? rows : <Text
                            ta="center"
                            size='xs'>
                            Datos no encontrados
                        </Text>
                }
            </ScrollArea>
            {
                Math.floor(tableHook.total) !== 0 && <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: rem(16)
                }}>
                    <Pagination
                        total={tableHook.total}
                        color="omegaColors"
                        size="sm"
                        value={tableHook.page}
                        radius='xl'
                        onChange={tableHook.setPage}
                        withEdges />
                </div>
            }
        </>
    )
}

export default ApiKeyLayout
