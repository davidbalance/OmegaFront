import { useDiseaseGroup, ELoadDiseaseGroupOnStart, useDisease } from '@/hooks';
import { Disease } from '@/services/api/disease/dtos';
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text } from '@mantine/core';
import { IconX, IconDeviceFloppy } from '@tabler/icons-react';
import React, { useEffect, useRef } from 'react'
import DiseaseForm from '../disease-form/DiseaseForm';

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
                        Formulario de actualizacion de morbilidad
                    </Text>
                </Box>

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