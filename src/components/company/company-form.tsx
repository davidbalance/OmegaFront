'use client'

import { TextInput, Button, rem, SimpleGrid } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconAddressBook, IconDeviceFloppy, IconId, IconPhone, IconSignature } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { ModularBox } from "../modular/box/ModularBox";
import { z } from "zod";
import CompanySchema from './schema/company.schema'
import ModularLayout from "../modular/layout/ModularLayout";
import { Company } from "@/server/company/server-types";

type CompanyFormProps = Partial<Omit<Company, 'companyId' | 'hasBranches'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof CompanySchema>) => void;
};
const CompanyForm: React.FC<CompanyFormProps> = ({
    companyAddress,
    companyName,
    companyPhone,
    companyRuc,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof CompanySchema>>({
        initialValues: {
            companyName: companyName ?? '',
            companyRuc: companyRuc ?? '',
            companyAddress: companyAddress ?? '',
            companyPhone: companyPhone ?? '',
        },
        validate: zodResolver(CompanySchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof CompanySchema>) => {
            onSubmit?.(value);
        }, [onSubmit]);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}
            style={{ flex: '1' }}>
            <ModularLayout>
                <ModularBox flex={1}>
                    <SimpleGrid
                        cols={{ base: 1, sm: 2 }}
                        mt={rem(16)}
                        px={rem(16)}
                        spacing={rem(8)}>
                        <TextInput
                            label="Nombre de la empresa"
                            placeholder="Empresa"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('companyName')} />

                        <TextInput
                            label="Ruc"
                            placeholder="Ruc"
                            leftSection={<IconId stroke={1.5} />}
                            {...form.getInputProps('companyRuc')} />

                        <TextInput
                            label="Direccion"
                            placeholder="Av. 6 de diciembre y..."
                            leftSection={<IconAddressBook stroke={1.5} />}
                            {...form.getInputProps('companyAddress')} />

                        <TextInput
                            label="Telefono"
                            placeholder="0999999999"
                            leftSection={<IconPhone stroke={1.5} />}
                            {...form.getInputProps('companyPhone')} />
                    </SimpleGrid>
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

export default CompanyForm;