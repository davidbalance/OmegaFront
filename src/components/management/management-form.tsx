'use client'

import { Box, TextInput, Button, rem, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconDeviceFloppy, IconSignature } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { ModularBox } from "../modular/box/ModularBox";
import { Management } from "@/server/management/server_types";
import { z } from "zod";
import ManagementSchema from './schema/management.schema'
import ModularLayout from "../modular/layout/ModularLayout";

type ManagementFormProps = Partial<Omit<Management, 'managementId'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof ManagementSchema>) => void;
};
const ManagementForm: React.FC<ManagementFormProps> = ({
    managementName,
    loading,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof ManagementSchema>>({
        initialValues: {
            managementName: managementName ?? '',
        },
        validate: zodResolver(ManagementSchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof ManagementSchema>) => {
            onSubmit?.(value);
        }, [onSubmit]);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}
            style={{ flex: '1' }}>
            <ModularLayout>
                <ModularBox flex={1}>
                    <Box mt={rem(16)} px={rem(16)}>
                        <TextInput
                            name="name"
                            label="Nombre de la gerencia"
                            placeholder="Gerencia"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('managementName')} />

                    </Box>
                    <Button type='submit' style={{ display: 'none' }} />
                </ModularBox>
                <ModularBox>
                    <Button
                        loading={loading}
                        fullWidth
                        flex={1}
                        size='xs'
                        type="submit"
                        leftSection={(
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        )}>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </form>)
}

export default ManagementForm;