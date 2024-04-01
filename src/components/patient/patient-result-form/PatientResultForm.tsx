import OmegaComboBox from '@/components/combobox/OmegaComboBox';
import { SelectorOption } from '@/lib';
import { Box, Grid, rem, Title, Button } from '@mantine/core';
import { options } from 'joi';
import React from 'react'

export type ResultData = {
    examName: string;
}

type PatientResultFormProps = {
    result: ResultData,
    options: SelectorOption<number>[],
    onSubmit?: (data: any) => void
}


const PatientResultForm: React.FC<PatientResultFormProps> = ({ result, options, onSubmit }) => {
    return <>
        <Box component='form' onSubmit={(e) => { e.preventDefault(); onSubmit?.(null); }}>
            <Grid h='70vh' p={rem(16)} pos='relative'>
                <Grid.Col span={12}>
                    <Title fw={500} size='sm' component="span" variant="text" c='omegaColors'>
                        {result.examName}
                    </Title>
                </Grid.Col>
                <Grid.Col span={12}>
                    <OmegaComboBox options={options} />
                </Grid.Col>
                <Button type='submit' fullWidth pos='absolute' bottom={0}>Guardar</Button>
            </Grid>
        </Box>
    </>
}

export default PatientResultForm