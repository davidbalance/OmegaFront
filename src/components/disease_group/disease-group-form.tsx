'use client'

import { Box, TextInput, Button, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconDeviceFloppy, IconSignature } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { ModularBox } from "../modular/box/ModularBox";
import { z } from "zod";
import DiseaseGroupSchema from './schemas/disease_group.schema'
import ModularLayout from "../modular/layout/ModularLayout";
import { DiseaseGroup } from "@/server/disease_group/server_types";

type DiseaseGroupFormProps = Partial<Omit<DiseaseGroup, 'groupId'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof DiseaseGroupSchema>) => void;
};
const DiseaseGroupForm: React.FC<DiseaseGroupFormProps> = ({
    groupName,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof DiseaseGroupSchema>>({
        initialValues: {
            groupName: groupName ?? '',
        },
        validate: zodResolver(DiseaseGroupSchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof DiseaseGroupSchema>) => {
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
                            label="Nombre del grupo de morbilidad"
                            placeholder="Grupo de morbilidad"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('groupName')} />

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

export default DiseaseGroupForm;