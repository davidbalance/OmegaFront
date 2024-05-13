import { useApiKey } from '@/hooks/useApiKey'
import { ActionIcon, Box, Button, LoadingOverlay, Modal, SimpleGrid, Text, TextInput, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconKey, IconDeviceFloppy } from '@tabler/icons-react'
import React, { ChangeEvent, FormEvent, useState } from 'react'

type ApiKeyCreateProps = {
    onCreate: () => void
}
const ApiKeyCreate: React.FC<ApiKeyCreateProps> = ({ onCreate }) => {

    const apiKeyHook = useApiKey();

    const [agreeState, AgreeDisclosure] = useDisclosure(false);
    const [inputState, setInputState] = useState<string | undefined>(undefined);

    const [error, setError] = useState<string | undefined>(undefined);

    const handleAgreement = () => {
        if (inputState === undefined) return;
        try {
            apiKeyHook.create({ name: inputState });
            setInputState("");
            onCreate();
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