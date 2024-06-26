import OmegaComboBox from '@/components/combobox/OmegaComboBox'
import { ELoadDiseaseGroupOnStart, useDisease, useDiseaseGroup } from '@/hooks'
import { useMedicalResult } from '@/hooks/useMedicalResult'
import { SelectorOption } from '@/lib'
import { OrderResult } from '@/services/api/order/dtos'
import { Box, Button, LoadingOverlay, rem } from '@mantine/core'
import { IconDeviceFloppy, IconFile, IconPdf } from '@tabler/icons-react'
import React, { FormEvent, useEffect, useState } from 'react'

type MedicalResultAssignDisease = {
    orderResult: OrderResult;
    onSubmit?: () => void;
}
const MedicalResultAssignDisease: React.FC<MedicalResultAssignDisease> = ({ orderResult, onSubmit }) => {

    const diseaseGroupHook = useDiseaseGroup(ELoadDiseaseGroupOnStart.LOAD_OPTIONS);
    const diseaseHook = useDisease();
    const medicalResultHook = useMedicalResult();

    const [diseaseGroup, setDiseaseGroup] = useState<SelectorOption<number> | undefined>((orderResult.diseaseGroupId && orderResult.diseaseGroupName) ? {
        key: orderResult.diseaseGroupId,
        label: orderResult.diseaseGroupName
    } : undefined);
    const [disease, setDisease] = useState<SelectorOption<number> | undefined>((orderResult.diseaseId && orderResult.diseaseName) ? {
        key: orderResult.diseaseId,
        label: orderResult.diseaseName
    } : undefined);

    const [diseaseGroupError, setDiseaseGroupError] = useState<string | undefined>(undefined);
    const [diseaseError, setDiseaseError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (orderResult.diseaseGroupId !== undefined) {
            diseaseHook.loadOptions(orderResult.diseaseGroupId);
        } else if (diseaseGroupHook.options.length > 0) {
            diseaseHook.loadOptions(diseaseGroupHook.options[0].key);
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderResult]);

    const handleDiseaseGroupChange = (index: number) => {
        const diseaseGroup = diseaseGroupHook.options[index];
        setDiseaseGroupError(undefined);
        setDiseaseError(undefined);
        setDiseaseGroup(diseaseGroup);
        diseaseHook.loadOptions(diseaseGroup.key);
    }

    const handleDiseaseChange = (index: number) => {
        setDiseaseError(undefined);
        setDisease(diseaseHook.options[index]);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (diseaseGroup === undefined) {
            setDiseaseGroupError("Debe seleccionar un grupo de morbilidades");
            return;
        }
        if (disease === undefined) {
            setDiseaseError("Debe seleccionar una morbilidad");
            return;
        }

        try {
            medicalResultHook.updateDisease({
                id: orderResult.id,
                diseaseGroupId: diseaseGroup.key,
                diseaseGroupName: diseaseGroup.label,
                diseaseId: disease.key,
                diseaseName: disease.label
            });
            onSubmit?.();
        } catch (error) { }
    }

    const handleFindFileClick = () => {
        try {
            medicalResultHook.findFile({ id: orderResult.id, name: `${orderResult.examName}` })
        } catch (error) { }
    }

    return <>
        <Box
            component='form'
            mih={300}
            pos='relative'
            onSubmit={handleSubmit}>
            <LoadingOverlay visible={medicalResultHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <LoadingOverlay visible={diseaseHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Button
                mb={rem(16)}
                loading={medicalResultHook.loading}
                onClick={handleFindFileClick}
                type='button'
                fullWidth
                size='compact-xs'
                leftSection={
                    <IconPdf stroke={1.5} />
                }>
                Descargar archivo
            </Button>

            <OmegaComboBox
                inputProps={{
                    label: 'Grupo de morbilidades',
                    mb: rem(16),
                    error: diseaseGroupError
                }}
                onChange={handleDiseaseGroupChange}
                value={diseaseGroupHook.options.findIndex((e) => e.label === orderResult.diseaseGroupName)}
                options={diseaseGroupHook.options.map((e) => e.label)} />

            <OmegaComboBox
                inputProps={{
                    label: 'Morbilidad',
                    mb: rem(32),
                    error: diseaseError
                }}
                onChange={handleDiseaseChange}
                value={diseaseHook.options.findIndex((e) => e.label === orderResult.diseaseName)}
                options={diseaseHook.options.map((e) => e.label)} />

            <Button
                type='submit'
                fullWidth
                leftSection={
                    <IconDeviceFloppy stroke={1.5} />
                }>
                Guardar
            </Button>
        </Box>
    </>
}

export default MedicalResultAssignDisease