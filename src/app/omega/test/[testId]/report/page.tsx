import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import ReportForm from './_components/report_form';
import { retriveMedicalReport } from '@/server/medical_test/actions';

interface ReportFormPageProps {
    params: { testId: string; }
}
const ReportFormPage: React.FC<ReportFormPageProps> = async ({
    params
}) => {

    const value = await retriveMedicalReport(params.testId);

    return (
        <>
            <ReturnableHeader title='Reporte medico' />
            <ReportForm
                testId={params.testId}
                content={value.reportContent} />
        </>
    )
}

export default ReportFormPage