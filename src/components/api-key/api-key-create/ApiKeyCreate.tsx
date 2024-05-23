import { useApiKey } from '@/hooks/useApiKey'
import { ActionIcon, Box, Button, LoadingOverlay, Modal, SimpleGrid, Text, TextInput, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconKey, IconDeviceFloppy, IconClipboard } from '@tabler/icons-react'
import React, { ChangeEvent, FormEvent, useState } from 'react'

type ApiKeyCreateProps = {
    onCreate: () => void
}
const ApiKeyCreate: React.FC<ApiKeyCreateProps> = ({ onCreate }) => {

    const apiKeyHook = useApiKey();

    const [agreeState, AgreeDisclosure] = useDisclosure(false);
    const [inputState, setInputState] = useState<string>("");

    const [keyState, setKeyState] = useState<string>("");

    const [error, setError] = useState<string | undefined>(undefined);

    const handleAgreement = async () => {
        if (inputState === undefined) return;
        try {
            const key = await apiKeyHook.create({ name: inputState });
            setInputState("");
            setKeyState(key);
        } catch (error) { }
        finally {
            AgreeDisclosure.close();
        }
    }

    const handleDisagree = () => {
        AgreeDisclosure.close();
        setInputState("");
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(undefined);
        setInputState(event.target.value);
    }

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputState === undefined || inputState.trim() === '') {
            setError("Escribrir un nombre")
            return;
        }
        AgreeDisclosure.open();
    }

    const handleCloseCopyToClipboardModal = () => {
        setKeyState("");
        onCreate();
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(keyState);
        notifications.show({
            message: 'Api key copiado con exito',
            color: 'green'
        });
    }

    return (
        <>
            <Modal
                opened={agreeState}
                onClose={handleDisagree}
                title={<Text size='xs'>Se va a crear un API Key. ¿Esta seguro?</Text>}
                withCloseButton={false}
                closeOnEscape>
                <LoadingOverlay visible={apiKeyHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <SimpleGrid cols={2} my={rem(8)}>
                    <Button variant='transparent' onClick={handleDisagree}>Cancelar</Button>
                    <Button onClick={handleAgreement}>Aceptar</Button>
                </SimpleGrid>
            </Modal>

            <Modal
                opened={keyState.trim() !== ""}
                onClose={handleCloseCopyToClipboardModal}
                title={<Text size='xs'>El apikey solo sera mostrada una vez</Text>}
            >
                <Text>{keyState}</Text>
                <SimpleGrid cols={3} my={rem(8)}>
                    <Box></Box>
                    <Button
                        variant='transparent'
                        onClick={handleCopyToClipboard}
                        leftSection={<IconClipboard />}>Copiar</Button>
                </SimpleGrid>
                <Box></Box>
            </Modal>

            <Box
                mb={rem(16)}
                component='form'
                onSubmit={handleFormSubmit}>
                <TextInput
                    value={inputState}
                    label='Ingrese nombre del api key'
                    placeholder='Mi api key'
                    onChange={handleInputChange}
                    leftSectionPointerEvents='none'
                    leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                    error={error}
                    rightSection={
                        <ActionIcon
                            variant="subtle"
                            type='submit'>
                            <IconDeviceFloppy style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    }
                    size='xs' />
            </Box>
        </>
    )
}

export default ApiKeyCreate