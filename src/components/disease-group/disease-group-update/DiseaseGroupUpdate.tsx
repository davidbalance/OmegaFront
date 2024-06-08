import { ELoadDiseaseGroupOnStart, useDiseaseGroup } from '@/hooks';
import { DiseaseGroup } from '@/services/api/disease-group/dtos';
import { LoadingOverlay, Group, rem, Box, Button } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseGroupForm from '../disease-group-form/DiseaseGroupForm';
import { SubLayoutFormTitle } from '@/components/sub-layout-form/SubLayoutTitle';

type DiseaseGroupUpdateProps = {
    diseaseGroup: DiseaseGroup;
    onClose: () => void;
}
const DiseaseGroupUpdate: React.FC<DiseaseGroupUpdateProps> = ({ diseaseGroup, onClose }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const diseaseGroupHook = useDiseaseGroup(ELoadDiseaseGroupOnStart.FIND_ALL);

    const handleSubmit = (data: Omit<DiseaseGroup, 'id'>) => {
        try {
            diseaseGroupHook.update({ ...diseaseGroup, ...data });
            onClose();
        } catch (error) { }
    }

    return <>
        <LoadingOverlay visible={diseaseGroupHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <SubLayoutFormTitle
            title={'Formulario de modificacion de grupos de morbilidades'}
            onClose={onClose} />

        <Group justify='center'>
            <Box pt={rem(32)} px='lg'>
                <DiseaseGroupForm
                    formData={diseaseGroup}
                    ref={buttonRef}
                    onFormSubmitted={handleSubmit} />

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

export { DiseaseGroupUpdate };