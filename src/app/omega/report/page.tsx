'use client'

import { ActionColumnProps, ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { MedicalReportForm } from '@/components/medical/report/form/MedicalReportForm';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type MedicalResultDataType = Omit<MedicalResult, 'order'> & { patientFullname: string };

const parseMedicalResult = (data: MedicalResult[]): MedicalResultDataType[] => data.map(e => ({
    ...e,
    patientFullname: e.order.patientFullname
}));

enum LayoutStates {
    DEFAULT,
    INSERT_REPORT
}

const columnsMedicalReport: ColumnOptions<MedicalResultDataType>[] = [
    { key: 'patientFullname', name: 'Paciente' },
    { key: 'examName', name: 'Examenes' },
]

const MedicalReport: React.FC = () => {

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const [selectedMedicalResult, setSelectedMedicalResult] = useState<MedicalResultDataType | null>(null);

    const {
        data: fetchData,
        error: fetchError,
        loading: fetchLoading
    } = useFetch<MedicalResult[]>('/api/medical/results/doctor', 'GET');

    const [medicalResults, {
        override: medicalResultOverride,
        update: medicalResultUpdate
    }] = useList<MedicalResultDataType>([]);

    const parsedMedicalResults = useMemo(() => parseMedicalResult(fetchData || []), [fetchData]);

    const handleCreateEvent = useCallback((data: MedicalResultDataType) => {
        setSelectedMedicalResult(data);
        setCurrentState(LayoutStates.INSERT_REPORT);
    }, []);

    const handleCloseEvent = useCallback(() => {
        setSelectedMedicalResult(null);
        setCurrentState(LayoutStates.DEFAULT);
    }, []);

    const handleTableAction = useCallback((props: ActionColumnProps<MedicalResultDataType>) => (
        <MedicalResultActionMenu
            data={props.value}
            onCreateReport={() => handleCreateEvent(props.value)}
            downloadReport={!!props.value.report}
            downloadResult
        />
    ), []);

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    useEffect(() => {
        if (parsedMedicalResults) medicalResultOverride(parsedMedicalResults);
    }, [parsedMedicalResults, medicalResultOverride]);

    const handleFormSubmittion = useCallback((data: MedicalResult) => {
        medicalResultUpdate('id', data.id, data);
    }, [medicalResultUpdate]);

    const view = useMemo(() => ({
        [LayoutStates.INSERT_REPORT]: (
            <MedicalReportForm
                result={selectedMedicalResult!}
                onClose={handleCloseEvent}
                onFormSubmittion={handleFormSubmittion} />
        ),
        [LayoutStates.DEFAULT]: (
            <TableLayout<MedicalResultDataType>
                title={'Reportes medicos'}
                columns={columnsMedicalReport}
                data={medicalResults}
                isLoading={fetchLoading}
                action={{
                    name: 'Acciones',
                    child: handleTableAction
                }}
                size={100}
            />
        ),
    }), [selectedMedicalResult, medicalResults, fetchLoading, handleTableAction, handleFormSubmittion]);

    return <>{view[currentState]}</>
}

export default MedicalReport