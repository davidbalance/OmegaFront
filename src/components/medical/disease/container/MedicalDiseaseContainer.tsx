import { MedicalResultDisease } from '@/lib/dtos/medical/result/disease/base.response.dto'
import { Box, Text } from '@mantine/core'
import React, { useMemo } from 'react'

interface MedicalDiseaseContainerProps {
    data: MedicalResultDisease[]
}

const MedicalDiseaseContainer: React.FC<MedicalDiseaseContainerProps> = ({ data }) => {

    const rows = useMemo(() => data.map((e) => (
        <Box w={150} key={e.id}>
            <Text size='xs' c='neutral' truncate='end'>{e.diseaseName}, {e.diseaseCommentary}</Text>
        </Box>
    )), [data]);

    return (
        rows && rows.length
            ? rows
            : <Text size='xs' c={'red'}>Morbilidades no asociadas</Text>
    )
}

export default MedicalDiseaseContainer