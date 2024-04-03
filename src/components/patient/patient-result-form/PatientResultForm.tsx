import OmegaComboBox from '@/components/combobox/OmegaComboBox';
import { SelectorOption } from '@/lib';
import { BaseFormProps } from '@/lib/types/base-form-prop';
import { OrderResult as OrderResultType } from '@/services/api/order/dtos';
import {
    Box,
    Grid,
    rem,
    Title,
    Button
} from '@mantine/core';
import React,
{
    FormEvent,
    useState
} from 'react'

export type ResultData = OrderResultType;

type PatientResultFormProps = Omit<BaseFormProps<OrderResultType>, 'formData'> & {
    formData: OrderResultType;
    options: SelectorOption<number>[];
}

const PatientResultForm: React.FC<PatientResultFormProps> = ({ options, onFormSubmitted, formData }) => {

    const [selected, setSelected] = useState<SelectorOption<number> | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleFormSubmitted = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selected) {
            setError('De selecionar una morbilidad');
            return;
        }
        onFormSubmitted({ ...formData, disease: selected?.key });
    }

    const handleComboboxChange = (index: number) => {
        setError(undefined);
        setSelected(options[index]);
    }

    return <>
        <Box component='form' onSubmit={handleFormSubmitted}>
            <Grid h='70vh' p={rem(16)} pos='relative'>
                <Grid.Col span={12}>
                    <Title fw={500} size='sm' component="span" variant="text" c='omegaColors'>
                        {formData?.examName}
                    </Title>
                </Grid.Col>
                <Grid.Col span={12}>
                    <OmegaComboBox
                        value={formData ? options.findIndex(e => e.key === formData.disease) : undefined}
                        onChange={handleComboboxChange}
                        options={options.map(e => e.label)}
                        inputProps={{
                            error: error
                        }} />
                </Grid.Col>
                <Button type='submit' fullWidth pos='absolute' bottom={0}>Guardar</Button>
            </Grid>
        </Box>
    </>
}

export default PatientResultForm