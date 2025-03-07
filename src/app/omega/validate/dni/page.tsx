import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Group, rem, ScrollArea, SimpleGrid, Text, Title } from '@mantine/core'
import React from 'react'
import DNIForm from './_components/dni-form'
import DNIValidatorProvider from './_context/dni-validator.context'
import DNITrigger from './_components/dni-trigger'
import { validateDni } from '@/server/registro-civil.action'

interface ValidateDNIPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const ValidateDNIPage: React.FC<ValidateDNIPageProps> = async ({ searchParams }) => {

    const dnis = typeof searchParams.dni === 'string' ? searchParams.dni.split(',') : undefined;
    const values: string[] = [];

    if (dnis) {
        for (const dni of dnis) {
            if (dni.length !== 10) {
                values.push('Cedula menor a 10 caracteres');
            } else {
                try {
                    const data = await validateDni(dni);
                    values.push(`${data.patientName} ${data.patientLastname}`);
                } catch (error) {
                    values.push('No es una cedula valida');
                }
            }
        }
    }

    return (
        <>
            <DNIValidatorProvider>
                <ModularBox>
                    <Group justify='space-between'>
                        <Title ta='left' order={4}>Validar cedulas</Title>
                        <DNITrigger />
                    </Group>
                </ModularBox>
                <Box
                    flex={1}
                    pos='relative'>
                    <ScrollArea
                        scrollbars='y'
                        pos='absolute'
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}>
                        <SimpleGrid
                            cols={2}
                            spacing={rem(8)}>
                            <DNIForm />
                            <ModularBox h='100%'>
                                {values.map(e => <Text key={Math.random()}>{e}</Text>)}
                            </ModularBox>
                        </SimpleGrid>
                    </ScrollArea>
                </Box>
            </DNIValidatorProvider>
        </>
    )
}

export default ValidateDNIPage