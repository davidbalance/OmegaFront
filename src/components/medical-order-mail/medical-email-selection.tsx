'use client'

import React from 'react'
import { useMedicalEmail } from './medical-email.context';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Modal, rem, Stack, UnstyledButton, useMantineTheme } from '@mantine/core';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto';
import { useConfirmation } from '@/contexts/confirmation.context';
import ListRow from '../_base/list/list-row';
import ListTbody from '../_base/list/list-tbody';

const MedicalEmailSelection: React.FC = () => {

    const { selection, options, cancelSelection, trigger } = useMedicalEmail();
    const { breakpoints } = useMantineTheme();
    const match = useMediaQuery(`(min-width: ${breakpoints.md})`);

    const handleClick = async (data: MedicalClientEmail) => {
        trigger(data);
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
                    <ListTbody>
                        {options.map(e => (
                            <ListRow
                                active={e.default}
                                key={e.id}
                                hoverable={true}>
                                <UnstyledButton
                                    w='100%'
                                    mih={rem(50)}
                                    onClick={() => handleClick(e)}>
                                    {e.email}
                                </UnstyledButton>
                            </ListRow>
                        ))}
                    </ListTbody>
                </Box>
            </Stack>
        </Modal>
    )
}

export default MedicalEmailSelection
