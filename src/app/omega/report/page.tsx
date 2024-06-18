'use client'

import { ActionColumnProps, ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { MedicalReportForm } from '@/components/medical/report/form/MedicalReportForm';
import { MedicalResultActionMenu } from '@/components/medical/result/action/MedicalResultActionMenu';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { MedicalResult } from '@/lib/dtos/medical/result/response.dto';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutStates {
    DEFAULT,
    INSERT_REPORT
}

const columnsMedicalReport: ColumnOptions<MedicalResult>[] = [
    { key: 'examName', name: 'Examenes' }
]

const MedicalReport: React.FC = () => {


    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const [selectedMedicalResult, setSelectedMedicalResult] = useState<MedicalResult | null>(null);

    const {
        data: fetchData,
        error: fetchError,
        loading: fetchLoading
    } = useFetch<MedicalResult[]>('/api/medical/results/doctor', 'GET');

    const [medicalResults, {
        append: medicalResultAppend,
        remove: medicalResultRemove,
        override: medicalResultOverride,
        update: medicalResultUpdate
    }] = useList<MedicalResult>([])


    const handleCreateEvent = useCallback((data: MedicalResult) => {
        setSelectedMedicalResult(data);
        setCurrentState(LayoutStates.INSERT_REPORT);
    }, []);

    const handleCloseEvent = useCallback(() => {
        setSelectedMedicalResult(null);
        setCurrentState(LayoutStates.DEFAULT);
    }, []);

    const handleTableAction = useCallback((props: ActionColumnProps<MedicalResult>) => (
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
        if (fetchData) medicalResultOverride(fetchData);
    }, [fetchData, medicalResultOverride]);


    const view = useMemo(() => ({
        [LayoutStates.INSERT_REPORT]: (
            <MedicalReportForm
                result={selectedMedicalResult!}
                onClose={handleCloseEvent}
                onFormSubmittion={function (data: MedicalResult): void {
                    throw new Error('Function not implemented.');
                }} />
        ),
        [LayoutStates.DEFAULT]: (
            <TableLayout<MedicalResult>
                title={'Medicos'}
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
    }), [selectedMedicalResult, medicalResults, fetchLoading, handleTableAction]);

    return <>{view[currentState]}</>
}

export default MedicalReport