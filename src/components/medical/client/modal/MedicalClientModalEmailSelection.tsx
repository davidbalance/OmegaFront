import { MedicalClientEmail } from '@/lib/dtos/medical/client/response.dto'
import { Box, Button, Flex, Modal, ModalProps, ScrollArea, UnstyledButton, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useCallback, useMemo, useState } from 'react'
import classes from './MedicalClientModalEmailSelection.module.css'
import { notifications } from '@mantine/notifications';

interface MedicalClientModalEmailSelectionProps extends ModalProps {
    /**
     * Arreglo de correos electronicos.
     */
    email: MedicalClientEmail[];
    /**
     * Funcion que es invocada se cierra el formulario.
     * @param email 
     * @returns 
     */
    onSelection: (email: MedicalClientEmail) => void;
}

const MedicalClientModalEmailSelection: React.FC<MedicalClientModalEmailSelectionProps> = ({ email, onSelection, ...props }) => {

    const [selected, setSelected] = useState<MedicalClientEmail | null>(null);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const handleClickEvent = useCallback((value: MedicalClientEmail) => setSelected(value), []);

    const handleClickEventSubmittion = useCallback(() => {
        if (!selected) {
            notifications.show({ message: 'Debe seleccionar un correo antes de continuar' });
            return;
        }
        onSelection(selected);
    }, [onSelection, selected]);

    const options = useMemo(() => email.map(e => (
        <Box key={e.id} w='100%'>
            <UnstyledButton
                className={classes.option}
                data-active={selected?.id === e.id || undefined}
                onClick={() => handleClickEvent(e)}
            >
                {e.email}
            </UnstyledButton>
        </Box>
    )), [email, selected, handleClickEvent]);

    return (
        <Modal
            title='Selecciona un correo'
            fullScreen={isMobile}
            centered
            {...props}>
            <Flex direction='column' gap={rem(8)}>
                <Box flex={1}>
                    <ScrollArea h={300}>
                        {options}
                    </ScrollArea>
                </Box>
                <Button
                    fullWidth
                    onClick={handleClickEventSubmittion}
                >
                    Seleccionar
                </Button>
            </Flex>
        </Modal>
    )
}

export default MedicalClientModalEmailSelection