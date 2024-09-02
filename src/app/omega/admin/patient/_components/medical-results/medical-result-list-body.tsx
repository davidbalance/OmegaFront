import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { Flex, Title, Text } from '@mantine/core'
import React from 'react'
import AddQueryParam from '../add-query-param'
import dayjs from 'dayjs'
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto'
import MedicalDiseaseContainer from '@/components/medical/disease/container/MedicalDiseaseContainer'

interface MedicalResultListBodyProps {
    data: MedicalResult[]
}
const MedicalResultListBody: React.FC<MedicalResultListBodyProps> = ({ data }) => {
    return (
        <ListTbody>
            {data.map((result) => (
                <ListRow
                    hoverable={true}
                    key={result.id}>
                    <Flex justify='space-between' align='center'>
                        <AddQueryParam
                            value={result.id.toString()}
                            queryKey='medicalOrder'>
                            <Title order={6}>{result.examName}</Title>
                            <MedicalDiseaseContainer data={result.diseases || []} />
                            {!result.hasFile && <Text size='xs' c='red'>Archivo no encontrado</Text>}
                            {!result.report && <Text size='xs' c='red'>Reporte no realizado</Text>}
                        </AddQueryParam>
                        <ActionMenu>

                        </ActionMenu>
                    </Flex>
                </ListRow >
            ))}
        </ListTbody >
    )
}

export default MedicalResultListBody