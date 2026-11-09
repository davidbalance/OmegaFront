'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, Select, Stack, TextInput, Title } from '@mantine/core';
import AuthorSchema, { adjustInitialValue, AuthorSchemaType, LOGO_NONE, LOGO_OMEGA } from '@/server/record/create-record/base/author.schema';

const logoOption: { value: string, label: string }[] = [
    { label: 'Ninguno', value: LOGO_NONE },
    { label: 'Omega', value: LOGO_OMEGA },
]

type ProfessionalDataFormProps = {
    data?: Partial<AuthorSchemaType>,
    onSubmit?: (value: AuthorSchemaType) => void;
}
const ProfessionalDataForm = React.forwardRef<HTMLFormElement, ProfessionalDataFormProps>(({
    data,
    onSubmit
}, ref) => {

    const { getInputProps, onSubmit: formSubmit } = useForm<AuthorSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(AuthorSchema)
    });

    const handleSubmit = useCallback((value: AuthorSchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Datos del profesional y Logo para la Ficha</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={formSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>

                <Stack gap={rem(16)}>
                    <Select
                        data={logoOption}
                        checkIconPosition="left"
                        label="¿Logo para la ficha?"
                        placeholder="eg. Apto"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        allowDeselect={false}
                        {...getInputProps('logo')} />

                    <TextInput
                        label="Nombre del profesional"
                        {...getInputProps('author.fullname')}
                        description="Si el campo se deja vacío, se usarán los datos de su usuario." />
                    <TextInput
                        label="Cédula del profesional"
                        description="Si el campo se deja vacío, se usarán los datos de su usuario."
                        {...getInputProps('author.dni')} />
                </Stack>
            </Box>
        </>
    )
});

ProfessionalDataForm.displayName = 'ProfessionalDataForm'

export default ProfessionalDataForm