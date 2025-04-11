'use client'

import { Box, TextInput, Button, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconDeviceFloppy, IconSignature } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { ModularBox } from "../modular/box/ModularBox";
import { z } from "zod";
import DiseaseSchema from './schemas/disease.schema'
import ModularLayout from "../modular/layout/ModularLayout";
import { Disease } from "@/server/disease/server-types";

type DiseaseFormProps = Partial<Omit<Disease, 'diseaseId'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof DiseaseSchema>) => void;
};
const DiseaseForm: React.FC<DiseaseFormProps> = ({
    diseaseName,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof DiseaseSchema>>({
        initialValues: {
            diseaseName: diseaseName ?? '',
        },
        validate: zodResolver(DiseaseSchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof DiseaseSchema>) => {
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
                            label="Nombre de la morbilidad"
                            placeholder="Morbilidad"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('diseaseName')} />

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

export default DiseaseForm;