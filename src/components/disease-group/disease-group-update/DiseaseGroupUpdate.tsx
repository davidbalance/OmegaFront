import { ELoadDiseaseGroupOnStart, useDiseaseGroup } from '@/hooks';
import { DiseaseGroup } from '@/services/api/disease-group/dtos';
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text } from '@mantine/core';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseGroupForm from '../disease-group-form/DiseaseGroupForm';

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
        <Group w='100%' justify='flex-end' mb={rem(6)}>
            <ActionIcon variant='transparent' onClick={onClose}>
                <IconX />
            </ActionIcon>
        </Group>
        <Group justify='center'>
            <Box miw={rem(800)} pt={rem(32)} px='lg'>
                <Box mb={rem(12)}>
                    <Text
                        tt="uppercase"
                        fw={500}
                        component='span'
                        variant='text'
                        c="omegaColors"
                        size='md'>
                        Formulario de actualizacion de groupos de morbilidades
                    </Text>
                </Box>

                <DiseaseGroupForm
                    formData={diseaseGroup}
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

export { DiseaseGroupUpdate };