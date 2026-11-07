import Title from '@/components/_base/mantine/title';
import ReturnableHeader from '@/components/_base/returnable-header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { retriveMedicalTests } from '@/server';
import { MedicalTest } from '@/server/medical-test/server-types';
import React from 'react'
import MassiveUploadPage from './_components/massive-upload-page';

interface MassiveResultUploadPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const PAGE_TITLE = 'Carga Masiva de Pruebas'

const MassiveResultUploadPage: React.FC<MassiveResultUploadPageProps> = async ({
    searchParams
}) => {

    const orderId = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    if (!orderId) {
        return (
            <>
                <ReturnableHeader title={PAGE_TITLE} />
                <ModularBox>
                    <Title order={3} component="span">Order invalida para carga</Title>
                </ModularBox>
            </>
        )
    }

    const testValues: MedicalTest[] = await retriveMedicalTests({ orderId })

    return (
        <>
            <ReturnableHeader title={PAGE_TITLE} />
            <MassiveUploadPage tests={testValues} />
        </>
    )
}

export default MassiveResultUploadPage