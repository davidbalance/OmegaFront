'use client'

import { Box, TextInput, Button, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconDeviceFloppy, IconSignature } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { ModularBox } from "../modular/box/ModularBox";
import { z } from "zod";
import BranchSchema from './schema/branch.schema'
import ModularLayout from "../modular/layout/ModularLayout";
import { Area } from "@/server/area/server-types";
import { Branch } from "@/server/branch/server-types";

type BranchFormProps = Partial<Omit<Branch, 'branchId' | 'companyId' | 'cityName'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof BranchSchema>) => void;
};
const BranchForm: React.FC<BranchFormProps> = ({
    branchName,
    loading,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof BranchSchema>>({
        initialValues: {
            branchName: branchName ?? '',
        },
        validate: zodResolver(BranchSchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof BranchSchema>) => {
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
                            label="Nombre de la sucursal"
                            placeholder="Sucursal"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('branchName')} />

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

export default BranchForm;