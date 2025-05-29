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
            <Title component='span' order={6} fw='bolder'>ANTECEDENTES GINECO OBSTETRICOS</Title>
            <PreviewRecordContent>
                <SimpleGrid cols={3}>
                    <Stack gap={16}>
                        <PreviewRecordElement title='MENARQUIA' text={gynecologicalMenarche} />
                        <PreviewRecordElement title='CICLOS' text={gynecologicalCycle} />
                        <PreviewRecordElement title='FECHA DE ULTIMA MENSTRUACION' text={dayjs(gynecologicalLastMenstruationDate).format('YYYY/MM/DD')} />
                    </Stack>
                    <Stack gap={16}>
                        <PreviewRecordElement title='GESTAS' text={gynecologicalDeeds.toString()} />
                        <PreviewRecordElement title='PARTOS' text={gynecologicalBirths.toString()} />
                        <PreviewRecordElement title='CESAREAS' text={gynecologicalCesarean.toString()} />
                        <PreviewRecordElement title='ABORTOS' text={gynecologicalAbortions.toString()} />
                    </Stack>
                    <Stack gap={16}>
                        <Stack gap={rem(2)}>
                            <Text component='span' fw='bolder'>HIJOS</Text>
                            <Group>
                                <Text component='span'>VIVOS</Text>
                                <Text component='span'>{gynecologicalLivingChildren.toString()}</Text>
                            </Group>
                            <Group>
                                <Text component='span'>MUERTOS</Text>
                                <Text component='span'>{gynecologicalDeadChildren.toString()}</Text>
                            </Group>
                        </Stack>
                        <PreviewRecordElement title='VIDA SEXUAL ACTIVA' text={gynecologicalSexualLife ? 'Si' : 'No'} />
                        <Stack gap={rem(2)}>
                            <Text component='span' fw='bolder'>METODO DE PLANIFICACION FAMILIAR</Text>
                            <Group>
                                <Text component='span'>{!!gynecologicalFamilyPlanningType ? 'Si' : 'No'}</Text>
                                {!!gynecologicalFamilyPlanningType && <Text component='span'>{gynecologicalFamilyPlanningType}</Text>}
                            </Group>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </PreviewRecordContent>
            <PreviewInitialHistoryExam exams={[
                { exam: 'PAPANICOLAU', ...gynecologicalExamPapanicolau },
                { exam: 'COLPOSCOPIA', ...gynecologicalExamColposcopy },
                { exam: 'ECO MAMARIO', ...gynecologicalExamBreastEcho },
                { exam: 'MAMOGRAFIA', ...gynecologicalExamMammography },
            ]} />
        </>
    )
}

export default PreviewInitialRecordGinecological