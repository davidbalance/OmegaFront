import { ModularBox } from '@/components/modular/box/ModularBox'
import { useFetch } from '@/hooks/useFetch/useFetch'
import { POSTApiKeyRequestDto } from '@/lib/dtos/api/key/request.dto'
import { ApiKey, POSTApiKeyResponseDto } from '@/lib/dtos/api/key/response.dto'
import { ActionIcon, Box, Button, LoadingOverlay, Modal, SimpleGrid, Text, TextInput, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconKey, IconDeviceFloppy, IconClipboard } from '@tabler/icons-react'
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

type ApiKeyFormCreateProps = {
    onFormSubmittion: (data: ApiKey) => void;
}
const ApiKeyFormCreate: React.FC<ApiKeyFormCreateProps> = ({ onFormSubmittion }) => {

    const [inputState, setInputState] = useState<string>("");
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [shouldPatch, setShouldPatch] = useState<boolean>(false);

    const {
        body: postBody,
        data: postData,
        error: postError,
        loading: postLoading,
        reload: postReload,
        request: postRequest,
        reset: postReset
    } = useFetch<POSTApiKeyResponseDto>('/api/key', 'POST', { loadOnMount: false });

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputState(event.target.value);
    }, []);

    const handleFormSubmittion = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputState === undefined || inputState.trim() === '') {
            notifications.show({ message: 'Debe ingresar el nombre de un api key', color: 'red' });
            return;
        }
        postRequest<POSTApiKeyRequestDto>({ name: inputState });
        setShouldPatch(true);
    }, [inputState, postRequest]);

    useEffect(() => {
        if (postError) notifications.show({ message: postError.message, color: 'red' });
    }, [postError]);

    useEffect(() => {
        if (shouldPatch && postBody) {
            postReload();
            setShouldPatch(false);
        }
    }, [shouldPatch, postBody]);

    useEffect(() => {
        if (postData) {
            setApiKey(postData.apikey);
            onFormSubmittion(postData);
            postReset();
        }
    }, [postData, onFormSubmittion, postReset]);

    const handleCloseEvent = useCallback(() => {
        setApiKey(null);
    }, []);

    const handleCopyToClipboardEvent = useCallback(() => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            notifications.show({ message: 'Api key copiado con exito', color: 'green' });
        }
    }, [apiKey]);

    return (
        <>
            <Modal
                opened={!!apiKey}
                onClose={handleCloseEvent}
                title={<Text size='xs'>El apikey solo sera mostrada una vez</Text>}
            >
                <Text>{apiKey}</Text>
                <SimpleGrid cols={3} my={rem(8)}>
                    <Button
                        variant='transparent'
                        onClick={handleCopyToClipboardEvent}
                        leftSection={<IconClipboard />}>Copiar</Button>
                </SimpleGrid>
                <Box></Box>
            </Modal>

            <ModularBox pos='relative'>
                <LoadingOverlay visible={postLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Box
                    component='form'
                    onSubmit={handleFormSubmittion}>
                    <TextInput
                        value={inputState}
                        label='Ingrese nombre del api key'
                        placeholder='Mi api key'
                        onChange={handleInputChange}
                        leftSectionPointerEvents='none'
                        leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                        rightSection={
                            <ActionIcon
                                variant="subtle"
                                type='submit'>
                                <IconDeviceFloppy
                                    style={{ width: '70%', height: '70%' }}
                                    stroke={1.5} />
                            </ActionIcon>
                        }
                        size='xs' />
                </Box>
            </ModularBox>
        </>
    )
}

export default ApiKeyFormCreate