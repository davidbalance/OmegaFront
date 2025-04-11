'use client'

import React from 'react'
import { useSelect } from '../_context/select.context'
import ListRow from '@/components/_base/list/list-row'
import { Group, UnstyledButton } from '@mantine/core'
import DiseaseDeleteButton from './disease-delete-button'
import { MedicalDisease } from '@/server/medical-test/server-types'

type DiseaseReportItemProps = {
    disease: MedicalDisease;
    testId: string;
    children: React.ReactNode
}
const DiseaseReportItem: React.FC<DiseaseReportItemProps> = ({
    disease,
    testId,
    children
}) => {

    const { select, value } = useSelect<MedicalDisease>();

    return (
        <ListRow
            active={value?.diseaseReportId === disease.diseaseReportId}
            hoverable={true}>
            <Group justify='space-between' wrap='nowrap'>
                <UnstyledButton
                    w='100%'
                    onClick={() => select(disease)}>
                    {children}
                </UnstyledButton>
                <DiseaseDeleteButton
                    diseaseReportId={disease.diseaseReportId}
                    testId={testId} />
            </Group>
        </ListRow>)
}

export default DiseaseReportItem