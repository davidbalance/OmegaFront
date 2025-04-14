'use client'

import { Box, TextInput, Button, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconDeviceFloppy, IconSignature } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { ModularBox } from "../modular/box/ModularBox";
import { z } from "zod";
import CorporativeSchema from './schema/corporative.schema'
import ModularLayout from "../modular/layout/ModularLayout";
import { Corporative } from "@/server/corporative/server-types";

type CorporativeFormProps = Partial<Omit<Corporative, 'corporativeId' | 'hasCompanies'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof CorporativeSchema>) => void;
};
const CorporativeForm: React.FC<CorporativeFormProps> = ({
    corporativeName,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof CorporativeSchema>>({
        initialValues: {
            corporativeName: corporativeName ?? '',
        },
        validate: zodResolver(CorporativeSchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof CorporativeSchema>) => {
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
                            label="Nombre del grupo corporativo"
                            placeholder="Grupo Corporativo"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('corporativeName')} />

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

export default CorporativeForm;