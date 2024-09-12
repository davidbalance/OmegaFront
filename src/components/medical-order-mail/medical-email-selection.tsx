'use client'

import React from 'react'
import { useMedicalEmail } from './medical-email.context';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Modal, rem, ScrollArea, Stack, UnstyledButton, useMantineTheme } from '@mantine/core';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto';
import { useConfirmation } from '@/contexts/confirmation.context';

const MedicalEmailSelection: React.FC = () => {

    const { selection, options, cancelSelection, trigger } = useMedicalEmail();
    const { breakpoints } = useMantineTheme();
    const match = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const { show } = useConfirmation();


    const handleClick = async (data: MedicalClientEmail) => {
        const state = await show('Enviar correo', `¿Deseas enviar a ${data.email}?`);
        if (state) {
            trigger(data);
        } else {
            cancelSelection();
        }
    }

    return (
        <Modal
            title='Selecciona un correo'
            fullScreen={match}
            centered
            opened={selection}
            onClose={cancelSelection}>
            <Stack gap={rem(8)}>
                <Box flex={1}>
                    <ScrollArea h={450}>
                        {options.map(e => (
                            <Box key={e.id} w='100%'>
                                <UnstyledButton onClick={() => handleClick(e)}>
                                    {e.email}
                                </UnstyledButton>
                            </Box>
                        ))}
                    </ScrollArea>
                </Box>
            </Stack>
        </Modal>
    )
}

export default MedicalEmailSelection
