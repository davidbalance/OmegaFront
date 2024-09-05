'use client'

import { ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { useFetch } from '@/hooks/useFetch'
import { useList } from '@/hooks/useList'
import { JobPosition } from '@/lib/dtos/location/job/position/base.response.dto'
import { notifications } from '@mantine/notifications'
import React, { useEffect } from 'react'

const columns: ColumnOptions<JobPosition>[] = [
    { name: 'Puesto', key: 'name' },
]
const JobPositionPage = () => {

    const {
        data: jobPositionData,
        loading: jobPositionLoading,
        error: jobPositionError
    } = useFetch<JobPosition[]>('/api/job/position', 'GET');

    const [jobPositions, {
        override: overrideJobPosition
    }] = useList<JobPosition>([]);

    useEffect(() => {
        if (jobPositionData) {
            overrideJobPosition(jobPositionData);
        }
    }, [jobPositionData, overrideJobPosition]);

    useEffect(() => {
        if (jobPositionError) notifications.show({ message: jobPositionError.message, color: 'red' });
    }, [jobPositionError]);

    return (
        <ModularLayout>
            <TableLayout<JobPosition>
                title={'Puestos de trabajo'}
                columns={columns}
                data={jobPositions}
                isLoading={jobPositionLoading} />
        </ModularLayout>
    )
}

export default JobPositionPage