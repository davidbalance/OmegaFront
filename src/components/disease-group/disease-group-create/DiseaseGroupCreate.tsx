import { ELoadDiseaseGroupOnStart, useDiseaseGroup } from '@/hooks';
import { LoadingOverlay, Group, rem, Box, Button } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseGroupForm from '../disease-group-form/DiseaseGroupForm';
import { DiseaseGroup } from '@/services/api/disease-group/dtos';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';

type DiseaseGroupCreateProps = {
    onClose: () => void;
}
const DiseaseGroupCreate: React.FC<DiseaseGroupCreateProps> = ({ onClose }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const diseaseGroupHook = useDiseaseGroup(ELoadDiseaseGroupOnStart.FIND_ALL);

    const handleSubmit = (data: Omit<DiseaseGroup, 'id'>) => {
        try {
            diseaseGroupHook.create(data);
            onClose();
        } catch (error) { }
    }

    return <>
        <LoadingOverlay visible={diseaseGroupHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <SubLayoutFormTitle
            title={'Formulario de creacion de groupos de morbilidades'}
            onClose={onClose} />

        <Group justify='center'>
            <Box pt={rem(32)} px='lg'>
                <DiseaseGroupForm
                    ref={buttonRef}
                    onFormSubmitted={handleSubmit} />

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
    </>;
}

export { DiseaseGroupCreate }