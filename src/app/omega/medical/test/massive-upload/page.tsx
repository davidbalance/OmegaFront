import Title from '@/components/_base/mantine/title';
import ReturnableHeader from '@/components/_base/returnable-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { retriveClientByDni, retriveMedicalTests } from '@/server';
import { MedicalTest } from '@/server/medical-test/server-types';
import React from 'react'
import MassiveUploadPage from './_components/massive-upload-page';
import { MedicalClient } from '@/server/medical-client/server-types';

interface MassiveResultUploadPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const PAGE_TITLE = 'Carga Masiva de Pruebas'

const MassiveResultUploadPage: React.FC<MassiveResultUploadPageProps> = async ({
    searchParams
}) => {

    const patientDni = typeof searchParams.patient === 'string' ? searchParams.patient : undefined;
    const orderId = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    if (!orderId || !patientDni) {
        return (
            <>
                <ReturnableHeader title={PAGE_TITLE} />
                <ModularBox>
                    <Title order={3} component="span">Datos incompletos para procesar la carga</Title>
                </ModularBox>
            </>
        )
    }

    const testValues: MedicalTest[] = await retriveMedicalTests({ orderId })
    const patient: MedicalClient = await retriveClientByDni(patientDni)

    return (
        <>
            <ReturnableHeader title={PAGE_TITLE} />
            <MassiveUploadPage
                patientName={`${patient.patientLastname} ${patient.patientName}`}
                tests={testValues} />
        </>
    )
}

export default MassiveResultUploadPage