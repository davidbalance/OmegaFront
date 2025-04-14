'use client'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { MedicalClient } from '@/server/medical-client/server-types'
import { Button, LoadingOverlay, rem, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { useCallback, useState } from 'react'
import { z } from 'zod'
import RoleSchema from '../_schemas/role.schema'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { getErrorMessage } from '@/lib/utils/errors'
import { changeRoleClient } from '@/server'

type RoleFormProps = Pick<MedicalClient, 'patientRole' | 'patientDni'>
const RoleForm: React.FC<RoleFormProps> = ({
    patientRole = "0",
    patientDni
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof RoleSchema>>({
        initialValues: {
            patientRole: patientRole
        },
        validate: zodResolver(RoleSchema)
    });

    const handleSubmit = useCallback(
        async (value: z.infer<typeof RoleSchema>) => {
            setLoading(true);
            try {
                await changeRoleClient({ ...value, dni: patientDni });
                router.back();
            } catch (error) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [patientDni, router]);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={loading} />
            <ModularLayout>
                <ModularBox flex={1}>
                    <TextInput
                        label='Rol'
                        placeholder='Rol del paciente'
                        {...form.getInputProps('patientRole')} />
                </ModularBox>
                <ModularBox>
                    <Button
                        fullWidth
                        flex={1}
                        size='xs'
                        type='submit'
                        leftSection={(
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />
                        )}>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </form>
    )
}

export default RoleForm