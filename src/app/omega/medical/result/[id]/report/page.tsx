import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import MedicalResultReportForm from './_components/medical-result-report-form';
import { retriveMedicalResultReport } from '@/server/medical-result.actions';

export const dynamic = 'force-dynamic'
interface OmegaMedicalResultReportPageProps {
    params: { id: number; }
}
const OmegaMedicalResultReportPage: React.FC<OmegaMedicalResultReportPageProps> = async ({
    params
}) => {

    const value = await retriveMedicalResultReport(params.id);
    console.log(value);

    return (
        <>
            <ReturnableHeader title='Reporte medico' />
            <MedicalResultReportForm medicalResult={params.id} {...value} />
        </>
    )
}

export default OmegaMedicalResultReportPage