import { ELoadDiseaseGroupOnStart, useDisease, useDiseaseGroup } from '@/hooks';
import { LoadingOverlay, Group, rem, Box, Button } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseForm from '../disease-form/DiseaseForm';
import { Disease } from '@/services/api/disease/dtos';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';

type DiseaseCreateProps = {
    onClose: () => void;
}

const DiseaseCreate: React.FC<DiseaseCreateProps> = ({ onClose }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const diseaseGroupHook = useDiseaseGroup(ELoadDiseaseGroupOnStart.LOAD_OPTIONS);
    const diseaseHook = useDisease();

    const handleSubmit = (data: Omit<Disease, 'id' | 'group'> & { group: number }) => {
        try {
            diseaseHook.create({ ...data });
            onClose();
        } catch (error) { }
    }

    return <>
        <LoadingOverlay visible={diseaseGroupHook.loading || diseaseHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <SubLayoutFormTitle
            title={'Formulario de creacion de morbilidades'}
            onClose={onClose} />

        <Group justify='center'>
            <Box pt={rem(32)} px='lg'>
                <DiseaseForm
                    ref={buttonRef}
                    onFormSubmitted={handleSubmit}
                    options={diseaseGroupHook.options} />

                <Group justify="center" mt="xl">
                    <Button
                        onClick={() => buttonRef.current?.click()}
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />}>Guardar
                    </Button>
                </Group>

            </Box>
        </Group>
    </>;
}

export { DiseaseCreate }