import { ModularBox } from '@/components/modular/box/ModularBox'
import { useFetch } from '@/hooks/useFetch'
import { POSTMedicalEmailRequestDto } from '@/lib/dtos/medical/client/request.dto'
import { MedicalClientEmail, POSTMedicalEmailResponseDto } from '@/lib/dtos/medical/client/response.dto'
import { LoadingOverlay, Box, TextInput, rem, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconKey, IconDeviceFloppy } from '@tabler/icons-react'
import Joi from 'joi'
import { joiResolver } from 'mantine-form-joi-resolver'
import React, { useCallback, useEffect, useState } from 'react'

const userSchema = Joi.object({
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .empty()
        .messages({
            'string.email': 'Correo invalido',
            'string.empty': 'Correo invalido',
        })
});

interface MedicalClientFormProps {
    /**
     * DNI del cliente medico.
     */
    dni: string;
    /**
     * Funcion que es invocada antes de enviar el fomulario.
     * @param email 
     * @returns 
     */
    onValidate: (email: string) => boolean;
    /**
     * Funcion que es invocada cuando se completa el envio del formmulario.
     * @param data 
     * @returns 
     */
    onFormSubmittion?: (data: MedicalClientEmail[]) => void;
}
const MedicalClientForm: React.FC<MedicalClientFormProps> = ({ dni, onValidate, onFormSubmittion }) => {

    const form = useForm({ initialValues: { email: '' }, validate: joiResolver(userSchema) });

    const [shouldPatch, setShouldPatch] = useState<boolean>(false);

    const {
        body: postBody,
        data: postData,
        error: postError,
        loading: postLoading,
        reload: postReload,
        request: postRequest,
        reset: postReset
    } = useFetch<MedicalClientEmail[]>(`/api/medical/client/${dni}/email`, 'POST', { loadOnMount: false });

    const handleFormSubmittion = useCallback(({ email }: { email: string }) => {
        if (onValidate(email)) {
            postRequest<POSTMedicalEmailRequestDto>({ email });
            setShouldPatch(true);
        } else {
            notifications.show({ message: 'Este correo ya existe' });
        }
    }, [onValidate, postRequest]);

    useEffect(() => {
        if (postError) notifications.show({ message: postError.message, color: 'red' });
    }, [postError])


    useEffect(() => {
        if (shouldPatch && postBody) {
            postReload();
            setShouldPatch(false);
        }
    }, [shouldPatch, postBody, postReload]);

    useEffect(() => {
        if (postData) {
            onFormSubmittion?.(postData);
            form.reset();
            postReset();
        }
    }, [postData, onFormSubmittion, postReset, form]);

    return (
        <ModularBox pos='relative'>
            <LoadingOverlay visible={postLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Box
                component='form'
                onSubmit={form.onSubmit(handleFormSubmittion)}>
                <TextInput
                    label='Ingrese un correo'
                    placeholder="hello@email.com"
                    leftSectionPointerEvents='none'
                    size='xs'
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
                    {...form.getInputProps('email')}
                />
            </Box>
        </ModularBox>
    )
}

export { MedicalClientForm }