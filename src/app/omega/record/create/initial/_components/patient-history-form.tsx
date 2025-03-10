'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useMemo } from 'react'
import PatientHistorySchema from '../_schemas/patient-history.schema'
import { z } from 'zod';
import { Box, Divider, rem, ScrollArea, Select, SimpleGrid, Stack, Textarea, TextInput } from '@mantine/core';
import CorporativeSelect from '@/components/corporative-select';
import { CorporativeOption } from '@/server/corporative/server_types';
import GenderSelector from '@/components/gender-selector';
import { DateInput } from '@mantine/dates';
import { CascadingSelectValue } from '@/components/cascading-select';


type PatientHistoryFormProps = {
    data?: Partial<z.infer<typeof PatientHistorySchema>>,
    options: CorporativeOption[],
    onSubmit?: (value: z.infer<typeof PatientHistorySchema>) => void;
}
const PatientHistoryForm = React.forwardRef<HTMLFormElement, PatientHistoryFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof PatientHistorySchema>>({
        initialValues: {
            medicalAndSurgicalHistory: '',
            gynecologicalMenarche: '',
            gynecologicalCycle: '',
            gynecologicalLastMenstruationDate: new Date(),
            gynecologicalDeeds: '',
            gynecologicalBirths: '',
            gynecologicalCesarean: '',
            gynecologicalAbortions: '',
            gynecologicalDeadChildren: '',
            gynecologicalLivingChildren: '',
            gynecologicalSexualLife: '',
            gynecologicalFamilyPlanningType: '',
            gynecologicalExam: {},
            maleReproductiveExam: {},
            maleReproductiveFamilyPlanningType: '',
            toxicHabitTobacco: undefined,
            toxicHabitAlcohol: undefined,
            toxicHabitOther: undefined,
            lifestylePhysicalActivityActive: false,
            lifestylePhysicalActivityType: '',
            lifestylePhysicalActivityDuration: 0,
            lifestyleMedicationTaking: false,
            lifestyleMedicationName: '',
            lifestyleMedicationQuantity: 0,
            lifestyleMedicationDuration: 0,
        },
        validate: zodResolver(PatientHistorySchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof PatientHistorySchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <ScrollArea
                component='div'
                px={rem(16)}
                style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                <Stack gap={rem(16)}>
                    <Divider label='Institucion' />
                    {/* <SimpleGrid cols={{ base: 1, sm: 4 }}>
                        <CorporativeSelect
                            options={options}
                            corporativeValue={defaultCorporative}
                            companyValue={data?.companyRUC}
                            useCompany
                            onChange={handleCorporativeChange} />
                        <TextInput
                            label="CIU"
                            placeholder="CIU"
                            {...form.getInputProps('companyCIU')} />
                        <TextInput
                            disabled
                            label="ESTABLECIMIENTO DE SALUD"
                            placeholder="eg. Omega"
                            {...form.getInputProps('institutionHealthFacility')} />
                    </SimpleGrid>
 */}

                </Stack>
            </ScrollArea>
        </Box >
    )
});

PatientHistoryForm.displayName = 'PatientHistoryForm'

export default PatientHistoryForm