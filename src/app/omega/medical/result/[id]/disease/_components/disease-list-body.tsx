import ListTbody from '@/components/_base/list/list-tbody'
import { MedicalResultDisease } from '@/lib/dtos/medical/result/disease/base.response.dto'
import React from 'react'
import DiseaseListRow from './disease-list-row'
import { Text, Title } from '@mantine/core'

interface DiseaseListBodyProps {
    data: MedicalResultDisease[]
}
const DiseaseListBody: React.FC<DiseaseListBodyProps> = ({
    data
}) => {
    return (
        <ListTbody>
            {data.map(e => (
                <DiseaseListRow key={e.id} value={e}>
                    <Title order={6}>{e.diseaseName}</Title>
                    <Text size='xs'>{e.diseaseGroupName}</Text>
                </DiseaseListRow>
            ))}
        </ListTbody>
    )
}

export default DiseaseListBody