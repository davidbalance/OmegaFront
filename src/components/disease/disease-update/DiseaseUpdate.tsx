import { useDiseaseGroup, ELoadDiseaseGroupOnStart, useDisease } from '@/hooks';
import { Disease } from '@/services/api/disease/dtos';
import { LoadingOverlay, Group, rem, Box, Button } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseForm from '../disease-form/DiseaseForm';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';

type DiseaseUpdateProps = {
    disease: Disease;
    onClose: () => void;
}
const DiseaseUpdate: React.FC<DiseaseUpdateProps> = ({ disease, onClose }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const diseaseGroupHook = useDiseaseGroup(ELoadDiseaseGroupOnStart.LOAD_OPTIONS);
    const diseaseHook = useDisease();

    const handleSubmit = (data: Omit<Disease, 'id' | 'group'> & { group: number }) => {
        try {
            diseaseHook.update({ id: disease.id, ...data });
            onClose();
        } catch (error) { }
    }

    return <>
        <LoadingOverlay visible={diseaseGroupHook.loading || diseaseHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <SubLayoutFormTitle
            title={'Formulario de actualizacion de morbilidad'}
            onClose={onClose} />

        <Group justify='center'>
            <Box pt={rem(32)} px='lg'>
                <DiseaseForm
                    ref={buttonRef}
                    formData={({
                        group: disease.group.id,
                        name: disease.name
                    })}
                    onFormSubmitted={handleSubmit}
                    options={diseaseGroupHook.options} />

                <Group justify="center" mt="xl">
                    <Button
                        onClick={() => buttonRef.current?.click()}
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5} />}>Guardar
                    </Button>
                </Group>

            </Box>
        </Group>
    </>
}

export { DiseaseUpdate }