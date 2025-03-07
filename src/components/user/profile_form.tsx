'use client'

import React, { useCallback } from 'react'
import { SimpleGrid, rem, TextInput, Button, Box } from '@mantine/core';
import { IconId, IconAt } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import ProfileSchema from './schemas/profile.schema';
import { z } from 'zod';
import { User } from '@/server/user/server_types';

type ProfileFormProps = {
    data?: Partial<z.infer<typeof ProfileSchema>>;
    disabledDni?: boolean;
    disabledEmail?: boolean;
    onSubmit?: (value: z.infer<typeof ProfileSchema>) => void;
}
const ProfileForm = React.forwardRef<HTMLFormElement, ProfileFormProps>(({
    data,
    disabledDni,
    disabledEmail,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof ProfileSchema>>({
        initialValues: {
            dni: data?.dni ?? '',
            email: data?.email ?? '',
            lastname: data?.lastname ?? '',
            name: data?.name ?? '',
        },
        validate: zodResolver(ProfileSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof ProfileSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} style={{ marginBottom: rem(16) }}>
                <TextInput
                    label="Nombre"
                    placeholder="Carlos Luis"
                    {...form.getInputProps('name')} />
                <TextInput
                    label="Apellido"
                    placeholder="Sanchez Rodriguez"
                    {...form.getInputProps('lastname')} />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 1 }} style={{ marginBottom: rem(16) }}>
                <TextInput
                    label="Cedula"
                    placeholder="17*******0"
                    max={10}
                    leftSection={<IconId stroke={1.5} />}
                    disabled={disabledDni}
                    {...form.getInputProps('dni')}
                />

                <TextInput
                    label="Correo Electronico"
                    placeholder="hello@email.com"
                    leftSection={<IconAt stroke={1.5} />}
                    disabled={disabledEmail}
                    {...form.getInputProps('email')}
                />
            </SimpleGrid>
            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    );
});

ProfileForm.displayName = 'ProfileForm';

export default ProfileForm