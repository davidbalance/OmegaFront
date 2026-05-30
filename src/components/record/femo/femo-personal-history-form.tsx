'use client'

import { Option } from '@/lib/types/option.type';
import PersonalHistorySchema, { DEFAULT_LIFE_STYLE, DEFAULT_PERFORMED_EXAM, DEFAULT_PREEXISTING_CONDITION, FAMILY_PLANNING_STATUS_DO_NOT_ANSWER, FAMILY_PLANNING_STATUS_NO, FAMILY_PLANNING_STATUS_YES, PersonalHistorySchemaType, SPECIAL_CONDITIONS_STATUS_DO_NOT_ANSWER, SPECIAL_CONDITIONS_STATUS_NO, SPECIAL_CONDITIONS_STATUS_YES, SUBSTANCE_CONSUMER_CURRENT_USER, SUBSTANCE_CONSUMER_FORMER_USER, SUBSTANCE_CONSUMER_NON_USER, adjustInitialValue } from '@/server/record/create-record/femo/personal-history.schema';
import { ActionIcon, Box, Button, Checkbox, Divider, Group, rem, Select, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import React, { useCallback } from 'react'

const HormoneTherapyStatusOptions: Option[] = [
    { label: 'Sí', value: SPECIAL_CONDITIONS_STATUS_YES },
    { label: 'No', value: SPECIAL_CONDITIONS_STATUS_NO },
    { label: 'No Responde', value: SPECIAL_CONDITIONS_STATUS_DO_NOT_ANSWER },
]

const FamilyPlanningStatusOptions: Option[] = [
    { label: "Si", value: FAMILY_PLANNING_STATUS_YES },
    { label: "No", value: FAMILY_PLANNING_STATUS_NO },
    { label: "No responde", value: FAMILY_PLANNING_STATUS_DO_NOT_ANSWER },
]

const SubstanceConsumerUserOptions: Option[] = [
    { label: "Consumidor", value: SUBSTANCE_CONSUMER_CURRENT_USER },
    { label: "Ex Consumidor", value: SUBSTANCE_CONSUMER_FORMER_USER },
    { label: "No Consumidor", value: SUBSTANCE_CONSUMER_NON_USER },
]

const MAX_PERFORMED_EXAMS_LENGTH: number = 2
const MAX_LIFE_STYLE_LENGTH: number = 3
const MAX_PREEXISTING_CONDITION_LENGTH: number = 3

type FemoPersonalHistoryFormProps = {
    data?: Partial<PersonalHistorySchemaType>,
    isFemale?: boolean,
    onSubmit?: (value: PersonalHistorySchemaType) => void;
}
const FemoPersonalHistoryForm = React.forwardRef<HTMLFormElement, FemoPersonalHistoryFormProps>(({
    data,
    isFemale,
    onSubmit
}, ref) => {

    const { onSubmit: formSubmit, setValues, getInputProps, values, errors } = useForm<PersonalHistorySchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(PersonalHistorySchema)
    });

    const hormoneTherapyStatus = values.personalHistory.specialConditions.hormoneTherapyStatus;
    const familyPlanningStatus = values.personalHistory.familyPlanning.status;
    const exams = values.personalHistory.exams ?? [];
    const lifeStyles = values.personalHistory.lifeStyles ?? [];
    const preexistingConditions = values.personalHistory.preexistingConditions ?? [];
    const toxicHabitTabaccoStatus = values.personalHistory.toxicHabits.tabacco.status;
    const toxicHabitAlcoholStatus = values.personalHistory.toxicHabits.alcohol.status;
    const toxicHabitOtherStatus = values.personalHistory.toxicHabits.other.status;

    const handleSubmit = useCallback((value: PersonalHistorySchemaType) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleAddPerformedExam = () => setValues(prev => (prev.personalHistory?.exams?.length ?? 0) < MAX_PERFORMED_EXAMS_LENGTH ? ({
        personalHistory: {
            ...prev.personalHistory!,
            exams: [...(prev.personalHistory?.exams ?? []), DEFAULT_PERFORMED_EXAM]
        }
    }) : prev);

    const handleRemovePerformedExam = (index: number) => setValues(prev => ({
        personalHistory: {
            ...prev.personalHistory!,
            exams: [...(prev.personalHistory?.exams?.slice(0, index) ?? []), ...(prev.personalHistory?.exams?.slice(index + 1) ?? [])]
        }
    }));

    const handleAddLifeStyle = () => setValues(prev => (prev.personalHistory?.lifeStyles?.length ?? 0) < MAX_LIFE_STYLE_LENGTH ? ({
        personalHistory: {
            ...prev.personalHistory!,
            lifeStyles: [...(prev.personalHistory?.lifeStyles ?? []), DEFAULT_LIFE_STYLE]
        }
    }) : prev);

    const handleRemoveLifeStyle = (index: number) => setValues(prev => ({
        personalHistory: {
            ...prev.personalHistory!,
            lifeStyles: [...(prev.personalHistory?.lifeStyles?.slice(0, index) ?? []), ...(prev.personalHistory?.lifeStyles?.slice(index + 1) ?? [])]
        }
    }));

    const handleAddPreexitingCondition = () => setValues(prev => (prev.personalHistory?.preexistingConditions?.length ?? 0) < MAX_PREEXISTING_CONDITION_LENGTH ? ({
        personalHistory: {
            ...prev.personalHistory!,
            preexistingConditions: [...(prev.personalHistory?.preexistingConditions ?? []), DEFAULT_PREEXISTING_CONDITION]
        }
    }) : prev);

    const handleRemovePreexitingCondition = (index: number) => setValues(prev => ({
        personalHistory: {
            ...prev.personalHistory!,
            preexistingConditions: [...(prev.personalHistory?.preexistingConditions?.slice(0, index) ?? []), ...(prev.personalHistory?.preexistingConditions?.slice(index + 1) ?? [])]
        }
    }));

    return (
        <>
            <Title order={3}>Antecedentes Personales</Title>
            <Box
                ref={ref}
                component='form'
                onSubmit={formSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Stack gap={rem(16)}>

                    <Textarea
                        label="Antecedentes Clínicos y Quirúrgicos"
                        placeholder='eg. Lore Ipsum...'
                        rows={5}
                        {...getInputProps('personalHistory.clinicalAndSurgical')} />

                    <Textarea
                        label="Antecedentes Familiares"
                        placeholder='eg. Lore Ipsum...'
                        {...getInputProps('personalHistory.familyHistory')} />

                    <Text fw={200} fs="italic">
                        Condición especial para las atenciones de urgencia, emergencia, y tratamiento médico (referido por el paciente)
                    </Text>

                    <Stack>
                        <Checkbox
                            labelPosition='left'
                            label="En caso de requerir transfusiones autoriza: "
                            {...getInputProps('personalHistory.specialConditions.allowsTransfusions', { type: 'checkbox' })}
                        />
                        <Select
                            data={HormoneTherapyStatusOptions}
                            checkIconPosition="left"
                            label="¿Se encuentra bajo algún tratamiento hormonal?"
                            placeholder="eg. Sí"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            {...getInputProps('personalHistory.specialConditions.hormoneTherapyStatus')} />
                        {hormoneTherapyStatus === SPECIAL_CONDITIONS_STATUS_YES && <TextInput
                            label="Describir tratamiento hormonal"
                            {...getInputProps('personalHistory.specialConditions.hormoneTherapyDetails')} />}
                    </Stack>

                    <Divider label={
                        isFemale ?
                            "Antecedentes Gineco Obstéricos" : "Antecedentes Reproductivos Masculinos"
                    } />

                    {isFemale && (<>
                        <DateInput
                            label="Fecha de última menstruación"
                            {...getInputProps('personalHistory.gynecological.lastMenstruationDate')} />
                        <SimpleGrid cols={{ base: 1, md: 4 }}>
                            <TextInput
                                label="Gestas"
                                min={0}
                                type='number'
                                {...getInputProps('personalHistory.gynecological.pregnancies')} />
                            <TextInput
                                label="Partos"
                                min={0}
                                type='number'
                                {...getInputProps('personalHistory.gynecological.births')} />
                            <TextInput
                                label="Cesáreas"
                                min={0}
                                type='number'
                                {...getInputProps('personalHistory.gynecological.cesareans')} />
                            <TextInput
                                label="Abortos"
                                min={0}
                                type='number'
                                {...getInputProps('personalHistory.gynecological.abortions')} />
                        </SimpleGrid>
                    </>)}

                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <Select
                            data={FamilyPlanningStatusOptions}
                            checkIconPosition="left"
                            label="Método de Planificación Familiar"
                            defaultDropdownOpened={false}
                            maxDropdownHeight={200}
                            {...getInputProps('personalHistory.familyPlanning.status')} />

                        {familyPlanningStatus === FAMILY_PLANNING_STATUS_YES && <Textarea
                            label="¿Cuál método de planificación familiar?"
                            placeholder='eg. Lore Ipsum...'
                            rows={5}
                            {...getInputProps('personalHistory.familyPlanning.detail')} />}
                    </SimpleGrid>

                    <Text fw={600}>Examenes Realizados</Text>
                    <Stack gap={rem(32)}>
                        {!exams.length ?
                            (<Button
                                variant='light'
                                onClick={handleAddPerformedExam}>
                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                            </Button>)
                            : exams.map((_, i) => (
                                (<Group
                                    w="100%"
                                    wrap='nowrap'
                                    key={i}
                                    gap={16}>
                                    <Stack>
                                        {exams.length - 1 === i && exams.length < MAX_PERFORMED_EXAMS_LENGTH && (
                                            <ActionIcon
                                                variant='light'
                                                onClick={handleAddPerformedExam}>
                                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                            </ActionIcon>
                                        )}
                                        <ActionIcon variant='light'
                                            onClick={() => handleRemovePerformedExam(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>
                                    </Stack>
                                    <Stack w="100%">
                                        <SimpleGrid cols={2} spacing={rem(8)}>
                                            <TextInput
                                                label="Examen"
                                                placeholder="eg. Omega"
                                                {...getInputProps(`personalHistory.exams.${i}.exam`)} />
                                            <TextInput
                                                label="Tiempo (años)"
                                                min={0}
                                                type='number'
                                                placeholder="eg. Gerente"
                                                {...getInputProps(`personalHistory.exams.${i}.time`)} />
                                        </SimpleGrid>
                                        <TextInput
                                            label="Registrar unicamente si interfiere con la activdad laboral y previa autorización del titular"
                                            placeholder="eg. Actividades"
                                            {...getInputProps(`personalHistory.exams.${i}.resultRecorded`)} />
                                    </Stack>
                                </Group>)
                            ))}
                    </Stack>

                    <Divider label="Consumo de Sustancias" />
                    <Stack gap={20}>
                        <SimpleGrid cols={3}>
                            <Text fw={600}>Tabaco</Text>
                            <input type='hidden' value="tabacco" {...getInputProps('personalHistory.toxicHabits.tabacco.name')} />
                            <Select
                                data={SubstanceConsumerUserOptions}
                                checkIconPosition="left"
                                label="Tipo de Consumidor"
                                defaultDropdownOpened={false}
                                maxDropdownHeight={200}
                                {...getInputProps('personalHistory.toxicHabits.tabacco.status')} />
                            <Stack gap={rem(8)}>
                                {(toxicHabitTabaccoStatus === SUBSTANCE_CONSUMER_FORMER_USER || toxicHabitTabaccoStatus === SUBSTANCE_CONSUMER_CURRENT_USER) && (
                                    <TextInput
                                        label="Tiempo de Consumo (años)"
                                        min={0}
                                        type='number'
                                        {...getInputProps('personalHistory.toxicHabits.tabacco.substanceUseDuration')} />
                                )}
                                {(toxicHabitTabaccoStatus === SUBSTANCE_CONSUMER_FORMER_USER) && (
                                    <TextInput
                                        label="Tiempo de Abstinencia (meses)"
                                        min={0}
                                        type='number'
                                        {...getInputProps('personalHistory.toxicHabits.tabacco.abstinenceDuration')} />
                                )}
                            </Stack>
                        </SimpleGrid>
                        <SimpleGrid cols={3}>
                            <input type='hidden' value="alcohol" {...getInputProps('personalHistory.toxicHabits.alcohol.name')} />
                            <Text fw={600}>Alcohol</Text>
                            <Select
                                data={SubstanceConsumerUserOptions}
                                checkIconPosition="left"
                                label="Tipo de Consumidor"
                                defaultDropdownOpened={false}
                                maxDropdownHeight={200}
                                {...getInputProps('personalHistory.toxicHabits.alcohol.status')} />
                            <Stack gap={rem(8)}>
                                {(toxicHabitAlcoholStatus === SUBSTANCE_CONSUMER_FORMER_USER || toxicHabitAlcoholStatus === SUBSTANCE_CONSUMER_CURRENT_USER) && (
                                    <TextInput
                                        label="Tiempo de Consumo (años)"
                                        min={0}
                                        type='number'
                                        {...getInputProps('personalHistory.toxicHabits.alcohol.substanceUseDuration')} />
                                )}
                                {(toxicHabitAlcoholStatus === SUBSTANCE_CONSUMER_FORMER_USER) && (
                                    <TextInput
                                        label="Tiempo de Abstinencia (meses)"
                                        min={0}
                                        type='number'
                                        {...getInputProps('personalHistory.toxicHabits.alcohol.abstinenceDuration')} />
                                )}
                            </Stack>
                        </SimpleGrid>
                        <SimpleGrid cols={3}>
                            <TextInput
                                label="Otro consumo"
                                {...getInputProps('personalHistory.toxicHabits.other.name')} />
                            <Select
                                data={SubstanceConsumerUserOptions}
                                checkIconPosition="left"
                                label="Tipo de Consumidor"
                                defaultDropdownOpened={false}
                                maxDropdownHeight={200}
                                {...getInputProps('personalHistory.toxicHabits.other.status')} />
                            <Stack gap={rem(8)}>
                                {(toxicHabitOtherStatus === SUBSTANCE_CONSUMER_FORMER_USER || toxicHabitOtherStatus === SUBSTANCE_CONSUMER_CURRENT_USER) && (
                                    <TextInput
                                        label="Tiempo de Consumo (años)"
                                        min={0}
                                        type='number'
                                        {...getInputProps('personalHistory.toxicHabits.other.substanceUseDuration')} />
                                )}
                                {(toxicHabitOtherStatus === SUBSTANCE_CONSUMER_FORMER_USER) && (
                                    <TextInput
                                        label="Tiempo de Abstinencia (meses)"
                                        min={0}
                                        type='number'
                                        {...getInputProps('personalHistory.toxicHabits.other.abstinenceDuration')} />
                                )}
                            </Stack>
                        </SimpleGrid>
                    </Stack>

                    <Divider label="Estilo de vida" />
                    <Stack gap={rem(32)}>
                        {!lifeStyles.length ?
                            (<Button
                                variant='light'
                                onClick={handleAddLifeStyle}>
                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                            </Button>)
                            : lifeStyles.map((_, i) => (
                                (<Group
                                    w="100%"
                                    wrap='nowrap'
                                    key={i}
                                    gap={16}>
                                    <Stack>
                                        {lifeStyles.length - 1 === i && lifeStyles.length < MAX_LIFE_STYLE_LENGTH && (
                                            <ActionIcon
                                                variant='light'
                                                onClick={handleAddLifeStyle}>
                                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                            </ActionIcon>
                                        )}
                                        <ActionIcon variant='light'
                                            onClick={() => handleRemoveLifeStyle(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>
                                    </Stack>
                                    <Stack w="100%">
                                        <SimpleGrid cols={2} spacing={rem(8)}>
                                            <TextInput
                                                label="Actividad Fisica"
                                                placeholder="eg. Omega"
                                                {...getInputProps(`personalHistory.lifeStyles.${i}.type`)} />
                                            <TextInput
                                                label="Tiempo"
                                                min={0}
                                                type='number'
                                                {...getInputProps(`personalHistory.lifeStyles.${i}.duration`)} />
                                        </SimpleGrid>
                                    </Stack>
                                </Group>)
                            ))}
                    </Stack>

                    <Divider label="Condición Preexistente" />
                    <Stack gap={rem(32)}>
                        {!preexistingConditions.length ?
                            (<Button
                                variant='light'
                                onClick={handleAddPreexitingCondition}>
                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                            </Button>)
                            : preexistingConditions.map((_, i) => (
                                (<Group
                                    w="100%"
                                    wrap='nowrap'
                                    key={i}
                                    gap={16}>
                                    <Stack>
                                        {preexistingConditions.length - 1 === i && preexistingConditions.length < MAX_PREEXISTING_CONDITION_LENGTH && (
                                            <ActionIcon
                                                variant='light'
                                                onClick={handleAddPreexitingCondition}>
                                                <IconPlus style={{ width: rem(16), height: rem(16) }} />
                                            </ActionIcon>
                                        )}
                                        <ActionIcon variant='light'
                                            onClick={() => handleRemovePreexitingCondition(i)}>
                                            <IconMinus style={{ width: rem(16), height: rem(16) }} />
                                        </ActionIcon>
                                    </Stack>
                                    <Stack w="100%">
                                        <SimpleGrid cols={2} spacing={rem(8)}>
                                            <TextInput
                                                label="Medicación Habitual"
                                                placeholder="eg. Omega"
                                                {...getInputProps(`personalHistory.preexistingConditions.${i}.type`)} />
                                            <TextInput
                                                label="Cantidad"
                                                min={0}
                                                type='number'
                                                {...getInputProps(`personalHistory.preexistingConditions.${i}.quantity`)} />
                                        </SimpleGrid>
                                    </Stack>
                                </Group>)
                            ))}
                    </Stack>

                    <Textarea
                        label="Observación"
                        placeholder='eg. Lore Ipsum...'
                        {...getInputProps('personalHistory.observations')} />
                </Stack>
            </Box>
        </>
    )
});

FemoPersonalHistoryForm.displayName = 'FemoPersonalHistoryForm';

export default FemoPersonalHistoryForm