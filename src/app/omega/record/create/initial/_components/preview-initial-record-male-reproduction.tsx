import Title from '@/components/_base/mantine/title';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { Group, rem, SimpleGrid, Stack, Text } from '@mantine/core';
import React from 'react'
import PreviewInitialHistoryExam from './preview-initial-record-history-exam';
import PreviewRecordContent from '@/components/record/preview-record-content';

type PreviewInitialRecordMaleReproductionProps = Pick<InitialRecordPayload, 'maleReproductiveExamProstateAntigen' | 'maleReproductiveExamProstateEcho' | 'maleReproductiveFamilyPlanningType' | 'maleReproductiveDeadChildren'
    | 'maleReproductiveLivingChildren'
>
const PreviewInitialRecordMaleReproduction: React.FC<PreviewInitialRecordMaleReproductionProps> = ({
    maleReproductiveExamProstateAntigen,
    maleReproductiveExamProstateEcho,
    maleReproductiveFamilyPlanningType,
    maleReproductiveDeadChildren,
    maleReproductiveLivingChildren
}) => {

    return (
        <>
            <Title component='span' order={6} fw='bolder'>Antecedentes reproductivos masculinos</Title>
            <PreviewInitialHistoryExam exams={[
                { exam: 'Antígeno prostático', ...maleReproductiveExamProstateAntigen },
                { exam: 'Eco prostático', ...maleReproductiveExamProstateEcho },
            ]} />
            <PreviewRecordContent>
                <SimpleGrid cols={2}>
                    <Stack gap={rem(2)}>
                        <Text component='span' fw='bolder'>Hijos</Text>
                        <Group>
                            <Text component='span'>Vivos</Text>
                            <Text component='span'>{maleReproductiveDeadChildren.toString()}</Text>
                        </Group>
                        <Group>
                            <Text component='span'>Muertos</Text>
                            <Text component='span'>{maleReproductiveLivingChildren.toString()}</Text>
                        </Group>
                    </Stack>
                    <Stack gap={rem(2)}>
                        <Text component='span' fw='bolder'>Método de planificación familiar</Text>
                        <Group>
                            <Text component='span'>{!!maleReproductiveFamilyPlanningType ? 'Si' : 'No'}</Text>
                            {!!maleReproductiveFamilyPlanningType && <Text component='span'>{maleReproductiveFamilyPlanningType}</Text>}
                        </Group>
                    </Stack>
                </SimpleGrid>
            </PreviewRecordContent>
        </>
    )
}

export default PreviewInitialRecordMaleReproduction