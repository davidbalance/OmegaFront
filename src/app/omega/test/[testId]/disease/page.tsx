import ListRoot from '@/components/_base/list/list-root'
import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { SimpleGrid, rem, Stack, Title, Text } from '@mantine/core'
import React from 'react'
import SelectProvider from './_context/select.context'
import { retriveMedicalDiseases } from '@/server/medical_test/actions'
import { retriveDiseaseGroupOptions } from '@/server/disease_group/actions'
import ListTbody from '@/components/_base/list/list-tbody'
import DiseaseReportItem from './_components/disease-report-item'
import DiseaseClearButton from './_components/disease-clear-button'
import MedicalDiseaseForm from '@/app/omega/test/[testId]/disease/_components/medical-disease-form'

type TestDiseasePageProps = {
    params: { testId: string }
}
const TestDiseasePage: React.FC<TestDiseasePageProps> = async ({
    params
}) => {

    const items = await retriveMedicalDiseases(params.testId);
    const options = await retriveDiseaseGroupOptions();

    return (
        <>
            <ReturnableHeader title='Administracion de morbilidades' />
            <SelectProvider>
                <SimpleGrid
                    spacing={rem(8)}
                    cols={{ base: 1, md: 2 }}
                    h='100%'>
                    <ModularBox flex={1}>
                        <Stack>
                            <DiseaseClearButton />
                            <ListRoot>
                                <ListTbody>
                                    {items.map(e => (
                                        <DiseaseReportItem
                                            key={e.diseaseReportId}
                                            disease={e}
                                            testId={params.testId}>
                                            <Title order={6}>
                                                {e.diseaseName}
                                            </Title>
                                            <Text size='xs'>
                                                {e.diseaseGroupName}
                                            </Text>
                                        </DiseaseReportItem>))}
                                </ListTbody>
                            </ListRoot>
                        </Stack>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <MedicalDiseaseForm
                            testId={params.testId}
                            options={options} />
                    </ModularBox>
                </SimpleGrid>
            </SelectProvider>
        </>
    )
}

export default TestDiseasePage