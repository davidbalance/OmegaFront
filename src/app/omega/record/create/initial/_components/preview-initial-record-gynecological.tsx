import Title from '@/components/_base/mantine/title';
import PreviewRecordElement from '@/components/record/preview-record-element';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { Group, rem, SimpleGrid, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react'
import PreviewInitialHistoryExam from './preview-initial-record-history-exam';
import PreviewRecordContent from '@/components/record/preview-record-content';

type PreviewInitialRecordGinecologicalProps = Pick<InitialRecordPayload, 'gynecologicalMenarche' | 'gynecologicalCycle' | 'gynecologicalLastMenstruationDate' | 'gynecologicalDeeds'
    | 'gynecologicalBirths' | 'gynecologicalCesarean' | 'gynecologicalAbortions' | 'gynecologicalDeadChildren'
    | 'gynecologicalLivingChildren' | 'gynecologicalSexualLife' | 'gynecologicalFamilyPlanningType' | 'gynecologicalExamPapanicolau'
    | 'gynecologicalExamColposcopy' | 'gynecologicalExamBreastEcho' | 'gynecologicalExamMammography'>
const PreviewInitialRecordGinecological: React.FC<PreviewInitialRecordGinecologicalProps> = ({
    gynecologicalMenarche,
    gynecologicalCycle,
    gynecologicalLastMenstruationDate,
    gynecologicalDeeds,
    gynecologicalBirths,
    gynecologicalCesarean,
    gynecologicalAbortions,
    gynecologicalDeadChildren,
    gynecologicalLivingChildren,
    gynecologicalSexualLife,
    gynecologicalFamilyPlanningType,
    gynecologicalExamPapanicolau,
    gynecologicalExamColposcopy,
    gynecologicalExamBreastEcho,
    gynecologicalExamMammography
}) => {

    return (
        <>
            <Title component='span' order={6} fw='bolder'>Antecedentes gineco-obstétricos</Title>
            <PreviewRecordContent>
                <SimpleGrid cols={3}>
                    <Stack gap={16}>
                        <PreviewRecordElement title='Menarquía' text={gynecologicalMenarche} />
                        <PreviewRecordElement title='Ciclos' text={gynecologicalCycle} />
                        <PreviewRecordElement title='Fecha de última menstruación' text={dayjs(gynecologicalLastMenstruationDate).format('YYYY/MM/DD')} />
                    </Stack>
                    <Stack gap={16}>
                        <PreviewRecordElement title='Gestas' text={gynecologicalDeeds.toString()} />
                        <PreviewRecordElement title='Partos' text={gynecologicalBirths.toString()} />
                        <PreviewRecordElement title='Cesáreas' text={gynecologicalCesarean.toString()} />
                        <PreviewRecordElement title='Abortos' text={gynecologicalAbortions.toString()} />
                    </Stack>
                    <Stack gap={16}>
                        <Stack gap={rem(2)}>
                            <Text component='span' fw='bolder'>Hijos</Text>
                            <Group>
                                <Text component='span'>Vivos</Text>
                                <Text component='span'>{gynecologicalLivingChildren.toString()}</Text>
                            </Group>
                            <Group>
                                <Text component='span'>Muertos</Text>
                                <Text component='span'>{gynecologicalDeadChildren.toString()}</Text>
                            </Group>
                        </Stack>
                        <PreviewRecordElement title='Vida sexual activa' text={gynecologicalSexualLife ? 'Si' : 'No'} />
                        <Stack gap={rem(2)}>
                            <Text component='span' fw='bolder'>Método de planificación familiar</Text>
                            <Group>
                                <Text component='span'>{!!gynecologicalFamilyPlanningType ? 'Si' : 'No'}</Text>
                                {!!gynecologicalFamilyPlanningType && <Text component='span'>{gynecologicalFamilyPlanningType}</Text>}
                            </Group>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </PreviewRecordContent>
            <PreviewInitialHistoryExam exams={[
                { exam: 'Papanicolaou', ...gynecologicalExamPapanicolau },
                { exam: 'Colposcopia', ...gynecologicalExamColposcopy },
                { exam: 'Eco mamario', ...gynecologicalExamBreastEcho },
                { exam: 'Mamografía', ...gynecologicalExamMammography },
            ]} />
        </>
    )
}

export default PreviewInitialRecordGinecological