import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root'
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section'
import React from 'react'
import PatientLayout from './_components/patient/patient-layout'
import MedicalOrderLayout from './_components/medical-order/medical-order-layout'
import MedicalResultLayout from './_components/medical-results/medical-result-layout'

interface PatientPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const PatientPage: React.FC<PatientPageProps> = ({ searchParams }) => {

    const patientSearch = typeof searchParams.patientSearch === 'string' ? searchParams.patientSearch : undefined;
    const patientOrder = typeof searchParams.patientOrder === 'string' ? searchParams.patientOrder : undefined;
    const patientPage = typeof searchParams.patientPage === 'string' ? Number(searchParams.patientPage) : 1;

    const morderSearch = typeof searchParams.morderSearch === 'string' ? searchParams.morderSearch : undefined;
    const morderOrder = typeof searchParams.morderOrder === 'string' ? searchParams.morderOrder : undefined;

    const mresultSearch = typeof searchParams.mresultSearch === 'string' ? searchParams.mresultSearch : undefined;
    const mresultOrder = typeof searchParams.mresultOrder === 'string' ? searchParams.mresultOrder : undefined;

    const patient = typeof searchParams.patient === 'string' ? searchParams.patient : undefined;
    const medicalOrder = typeof searchParams.medicalOrder === 'string' ? Number(searchParams.medicalOrder) : undefined;

    return (
        <>
            <MultipleLayerRoot>
                <MultipleLayerSection active={!patient && !medicalOrder}>
                    <PatientLayout
                        order={patientOrder}
                        search={patientSearch}
                        page={patientPage}
                        patient={patient} />
                </MultipleLayerSection>
                <MultipleLayerSection active={!!patient && !medicalOrder}>
                    <MedicalOrderLayout
                        medicalOrder={medicalOrder}
                        order={morderOrder}
                        patient={patient}
                        search={morderSearch} />
                </MultipleLayerSection>
                <MultipleLayerSection active={!!patient && !!medicalOrder}>
                    <MedicalResultLayout
                        medicalOrder={medicalOrder}
                        order={mresultOrder}
                        search={mresultSearch} />
                </MultipleLayerSection>
            </MultipleLayerRoot >
        </>
    )
}

export default PatientPage