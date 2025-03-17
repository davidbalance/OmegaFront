'use client'

import { DiseaseGroupOption } from '@/server/disease_group/server_types';
import { CreateMedicalDiseasePayload, MedicalDisease } from '@/server/medical_test/server_types';
import { Box, Button, Flex, Select, Textarea, rem } from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react'
import DiseaseSelect from '../../../../../../components/disease-select';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { createMedicalResultDisease, editMedicalResultDisease } from '@/server/medical_test/actions';
import { notifications } from '@mantine/notifications';
import { getErrorMessage } from '@/lib/utils/errors';
import { useSelect } from '../_context/select.context';
import { Option } from '@/lib/types/option.type';

type DiseaseFormValue = Omit<CreateMedicalDiseasePayload, 'testId'>;
type MedicalDiseaseFormProps = {
    options: Option[];
    diseaseReportId?: string;
    testId: string;
}
const MedicalDiseaseForm: React.FC<MedicalDiseaseFormProps> = ({
    options,
    testId,
    diseaseReportId
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { value, clear: cleanSelect } = useSelect<MedicalDisease>();

    const [formValue, setFormValue] = useState<DiseaseFormValue>({
        commentary: '',
        diseaseGroupId: '',
        diseaseGroupName: '',
        diseaseId: '',
        diseaseName: '',
    });

    useEffect(() => {
        if (value) {
            setFormValue({
                diseaseId: value.diseaseId,
                diseaseName: value.diseaseName,
                commentary: value.diseaseCommentary,
                diseaseGroupId: value.diseaseGroupId,
                diseaseGroupName: value.diseaseGroupName,
            });
        } else {
            resetForm();
        }
    }, [value]);

    const resetForm = () => {
        setFormValue({
            diseaseId: '',
            diseaseName: '',
            commentary: '',
            diseaseGroupId: '',
            diseaseGroupName: '',
        });
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
                if (diseaseReportId) {
                    await editMedicalResultDisease({ testId, diseaseReportId, ...formValue });
                } else {
                    await createMedicalResultDisease({ testId, ...formValue });
                }
                cleanSelect();
                resetForm();
            } catch (error) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [formValue, cleanSelect, testId, diseaseReportId]);

    const handleChange = (name: string, value: string): void => {
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            pos='relative'>
            <Flex gap={rem(8)} direction='column'>
                <Select
                    value={formValue.diseaseGroupId.trim() !== '' && formValue.diseaseId.trim() !== ''
                        ? `${formValue.diseaseGroupId} - ${formValue.diseaseId}`
                        : null}
                    label='Morbilidades'
                    placeholder='Escoge una morbilidad'
                    data={options}
                    searchable
                    onChange={(value, option) =>
                        value ? setFormValue((prev) => ({
                            ...prev,
                            diseaseGroupId: value.split(' - ')[0],
                            diseaseId: value.split(' - ')[1],
                            diseaseGroupName: option.label.split(' - ')[0],
                            diseaseName: option.label.split(' - ')[1],
                        })) : undefined
                    }
                />

                <Textarea
                    name='commentary'
                    label="Comentario"
                    value={formValue.commentary}
                    placeholder="Comentario de la morbilidad"
                    autosize
                    minRows={2}
                    maxRows={8}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    required
                />
            </Flex>
            <Button
                mt={rem(8)}
                size='xs'
                fullWidth
                type='submit'
                loading={loading}
                leftSection={(
                    <IconDeviceFloppy style={{
                        width: rem(16),
                        height: rem(16)
                    }} stroke={1.5} />
                )}>
                Guardar
            </Button>
        </Box >
    )
}

export default MedicalDiseaseForm;