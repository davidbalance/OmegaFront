import { useDiseaseGroup } from '@/hooks';
import { LoadingOverlay, Group, rem, ActionIcon, Box, Button, Text } from '@mantine/core';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseGroupForm from '../disease-group-form/DiseaseGroupForm';
import { DiseaseGroup } from '@/services/api/disease-group/dtos';

type DiseaseGroupCreateProps = {
    onClose: () => void;
}
const DiseaseGroupCreate: React.FC<DiseaseGroupCreateProps> = ({ onClose }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const diseaseGroupHook = useDiseaseGroup(true);

    const handleSubmit = (data: Omit<DiseaseGroup, 'id'>) => {
        try {
            diseaseGroupHook.create(data);
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
                        Formulario de creacion de groupos de morbilidades
                    </Text>
                </Box>

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