import { Button, ButtonGroup, Flex, Modal, ModalProps, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import React from 'react'

type ModalConfirmationProps = Omit<ModalProps, 'children' | 'title'> & {
    /**
     * Titulo de la confirmacion.
     */
    title: string;
    /**
     * Mensaje de la confirmacion.
     */
    message?: string;
    /**
     * Funcion que es invocada cuando se llama al evento de confirmacion.
     * @returns 
     */
    onConfirm: () => void;
}
const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ message, title, onConfirm, ...props }) => {

    const isMobile = useMediaQuery('(max-width: 50em)');

    const handleConfimation = () => {
        onConfirm();
        props.onClose();
    }

    return (
        <Modal.Root
            fullScreen={isMobile}
            closeOnEscape={false}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            {...props}>
            <Modal.Overlay backgroundOpacity={0.55} blur={3} />
            <Modal.Content>
                <Flex direction='column' h='100%'>
                    {isMobile && <Modal.Header><Modal.CloseButton icon={<IconX size={16} stroke={1.5} />} /></Modal.Header>}
                    <Modal.Body flex={1}>
                        <Flex direction='column' gap={16} h='100%'>
                            <Title order={4}>{title}</Title>
                            {message && <Text flex={1}>{message}</Text>}
                            <ButtonGroup>
                                <Button size={isMobile ? 'compact-sm' : 'compact-md'} onClick={props.onClose} fullWidth variant='outline'>Cancelar</Button>
                                <Button size={isMobile ? 'compact-sm' : 'compact-md'} onClick={handleConfimation} fullWidth variant='filled'>Aceptar</Button>
                            </ButtonGroup>
                        </Flex>
                    </Modal.Body>
                </Flex>
            </Modal.Content>
        </Modal.Root>
    )
}

export default ModalConfirmation