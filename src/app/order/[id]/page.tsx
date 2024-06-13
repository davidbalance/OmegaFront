'use client'
import { DownloadActionButton } from '@/components/download/action-button/DownloadActionButton'
import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout'
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement'
import { ModularBox } from '@/components/modular-box/ModularBox'
import { useFetch } from '@/hooks/useFetch/useFetch'
import { useList } from '@/hooks/useList'
import { blobFile } from '@/lib/utils/blob-to-file'
import { FindOrderFilesResponseDTO, OrderFileDto } from '@/services/api/order/dtos'
import { Avatar, Box, Button, ButtonGroup, Checkbox, Flex, Loader, Text, Title, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconDownload, IconSelectAll, IconUser } from '@tabler/icons-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface HeadUpProps {
    fullname: string;
    dni: string;
}
const HeadUp: React.FC<HeadUpProps> = ({ dni, fullname }) => {

    const isMobile = useMediaQuery('(max-width: 50em)');

    return (
        <Box w={isMobile ? '100%' : rem(240)}>
            <ModularBox h='100%' align='center' pos='relative' direction={isMobile ? 'row-reverse' : 'column'}>
                <Avatar color="orange" radius="lg" size={isMobile ? rem(36) : rem(160)}>
                    <IconUser style={{ width: isMobile ? rem(20) : rem(120), height: isMobile ? rem(20) : rem(120) }} />
                </Avatar>
                <Box w='100%'>
                    {isMobile ? <Text fw={500}>{fullname}</Text> : <Title order={6} ta='center'>{fullname}</Title>}
                    {!isMobile && <Text ta='center'>{dni}</Text>}
                </Box>
            </ModularBox>
        </Box>
    );
}

const medicalResultColumns: ListElement<OrderFileDto>[] = [
    { key: 'examName', name: 'Nombre del archivo' },
    { key: 'type', name: 'Tipo de archivo' },
];

const OrderIdPage: React.FC<{ params: { id: number } }> = ({ params }) => {

    const { data, error, loading } = useFetch<FindOrderFilesResponseDTO>(`/api/omega-drive/order/${params.id}`, 'GET');
    const {
        data: fileBlob,
        error: fileError,
        loading: fileLoading,
        body: fileBody,
        reload: fileReload,
        request: fileRequest,
        reset: fileReset
    } = useFetch<Blob>(`/api/files/multiple`, 'POST', { loadOnMount: false, type: 'blob' });

    const [orderResults, { override: medicalResultOverride }] = useList<OrderFileDto>([]);
    const [selected, setSelected] = useState<OrderFileDto[]>([]);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const handleClickEventDownloadAll = useCallback(() => {
        const files = orderResults.map(e => ({ id: e.id, type: e.type }));
        fileRequest({ files });
    }, [orderResults, fileRequest]);

    const handleClickEventDownloadSelected = useCallback(() => {
        const files = selected.map(e => ({ id: e.id, type: e.type }));
        fileRequest({ files });
    }, [selected, fileRequest]);

    const handleSelection = useCallback((selection: OrderFileDto) => {
        setSelected(prev => {
            const index = prev.findIndex(e => e.id === selection.id && e.type === selection.type);
            if (index === -1) return [...prev, selection];
            return prev.filter(e => !(e.id === selection.id && e.type === selection.type));
        })
    }, []);

    useEffect(() => {
        if (fileBody) fileReload();
    }, [fileBody]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
        else if (fileError) notifications.show({ message: fileError.message, color: 'red' });
    }, [error, fileError]);

    useEffect(() => {
        if (data) medicalResultOverride([...data.fileResults, ...data.fileReports]);
    }, [data])

    useEffect(() => {
        if (fileBlob && data) {
            blobFile(fileBlob, `${data.fullname.toLocaleLowerCase().split(' ').join('_')}.zip`);
            fileReset();
        }
    }, [fileBlob, data, fileReset])

    const handleOrderRows = useCallback((row: OrderFileDto) => (
        <ListRowElement
            key={`medical-${row.type}-${row.id}`}
            leftSection={<Checkbox
                checked={!!selected.find(e => e.id === row.id && e.type === row.type)}
                onChange={() => handleSelection(row)}
            />}
            rightSection={<DownloadActionButton
                url={`/api/files/${row.type}/${row.id}`}
                filename={`${row.examName.toLocaleLowerCase().split(' ').join('_')}.pdf`}
            />}
            onClick={() => handleSelection(row)}>
            <Title order={6}>{row.examName}</Title>
            <Text>{row.type === 'report' ? 'Reporte Medico' : 'Resultado Medico'}</Text>
        </ListRowElement>)
        , [selected, handleSelection]);

    const downloadSelectedButton = useMemo(() => selected.length > 0 &&
        <Button
            loading={fileLoading}
            variant='light'
            fullWidth
            size='compact-sm'
            onClick={handleClickEventDownloadSelected}
            leftSection={<IconSelectAll style={{ width: rem(16), height: rem(16) }} />}
        >
            Descargar seleccionados</Button>,
        [selected, fileLoading, handleClickEventDownloadSelected]);

    return (
        <>
            {
                loading
                    ? <Flex h='100%' justify='center' align='center' direction='column'>
                        <Loader type='dots' />
                        <Text>Buscando...</Text>
                    </Flex>
                    : data
                        ? <Box w='100%' h='100%'>
                            <Flex h='100%' gap={rem(8)} direction={isMobile ? 'column' : 'row'}>
                                <HeadUp
                                    fullname={data.fullname}
                                    dni={data.dni} />
                                <Flex flex={1} gap={rem(8)} direction='column'>
                                    <ListLayout<OrderFileDto>
                                        data={orderResults}
                                        loading={false}
                                        columns={medicalResultColumns}
                                        rows={handleOrderRows}
                                        size={50} />
                                    <ModularBox>
                                        <ButtonGroup>
                                            <Button
                                                onClick={handleClickEventDownloadAll}
                                                variant='filled'
                                                loading={fileLoading}
                                                fullWidth
                                                size='compact-sm'
                                                leftSection={<IconDownload
                                                    style={{ width: rem(16), height: rem(16) }} />}
                                            >Descargar todo</Button>
                                            {downloadSelectedButton}
                                        </ButtonGroup>
                                    </ModularBox>
                                </Flex>
                            </Flex>
                        </Box>
                        : <ModularBox h='100%' justify='center' align='center'>
                            <Title c='orange'>404</Title>
                            <Text>Ordenes no encontradas</Text>
                        </ModularBox >
            }
        </>
    )
}

export default OrderIdPage