'use client'

import { TextInput, rem, ActionIcon } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconKey, IconDeviceFloppy } from '@tabler/icons-react'
import React, { useState } from 'react'
import { z } from 'zod'
import PatientEmailSchema from './schemas/patient-email.schema'
import { createClientEmail } from '@/server'
import { getErrorMessage } from '@/lib/utils/errors'

interface PatientEmailFormProps {
    patientDni: string;
    emails?: string[];
}
const PatientEmailForm: React.FC<PatientEmailFormProps> = ({
    patientDni,
    emails = []
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof PatientEmailSchema>>({
        initialValues: { email: '' },
        validate: zodResolver(PatientEmailSchema)
    });

    const handleSubmit = async (data: { email: string }): Promise<void> => {
        if (emails.some(e => e === data.email)) {
            notifications.show({ message: 'Correo en uso', color: 'red' });
            return;
        }
        setLoading(true);
        try {
            await createClientEmail({ patientDni, email: data.email });
            form.reset();
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label='Ingrese un correo'
                placeholder="hello@email.com"
                leftSectionPointerEvents='none'
                leftSection={<IconKey style={{ width: rem(16), height: rem(16) }} />}
                rightSection={
                    <ActionIcon
                        variant="subtle"
                        type='submit'
                        loading={loading}>
                        <IconDeviceFloppy
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5} />
                    </ActionIcon>
                }
                {...form.getInputProps('email')}
            />
        </form>
    )
}

export { PatientEmailForm }