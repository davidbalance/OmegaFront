import React from 'react'
import MedicalClientForm from './_components/medical-client-form'
import MedicalClientValidateDniForm from './_components/medical-client-validate-dni-form'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Title } from '@mantine/core'
import MedicalClientValidateDniProvider from './_context/medical-client-validate-dni.context'

const AdminPatientCreate = () => {
    return (
        <>
            <ModularBox>
                <Box style={{ flexShrink: 0 }}>
                    <Title order={4} component='span'>Crear paciente</Title>
                </Box>
            </ModularBox>
            <MedicalClientValidateDniProvider>
                <MedicalClientValidateDniForm />
                <MedicalClientForm />
            </MedicalClientValidateDniProvider>
        </>
    )
}

export default AdminPatientCreate