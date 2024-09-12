'use client'

import React from 'react'
import { useSelect } from '../_context/select.context'
import ListRow from '@/components/_base/list/list-row'
import { MedicalResultDisease } from '@/lib/dtos/medical/result/disease/base.response.dto'
import { Group, UnstyledButton } from '@mantine/core'
import DiseaseDeleteButton from './disease-delete-button'

interface DiseaseListRowProps {
    value: MedicalResultDisease,
    children: React.ReactNode
}
const DiseaseListRow: React.FC<DiseaseListRowProps> = ({
    value: disease,
    children
}) => {

    const { select, value } = useSelect<MedicalResultDisease>();

    return (
        <ListRow
            active={value?.id === disease.id}
            hoverable={true}>
            <Group justify='space-between' wrap='nowrap'>
                <UnstyledButton
                    w='100%'
                    onClick={() => select(disease)}>
                    {children}
                </UnstyledButton>
                <DiseaseDeleteButton id={disease.id} />
            </Group>
        </ListRow>)
}

export default DiseaseListRow