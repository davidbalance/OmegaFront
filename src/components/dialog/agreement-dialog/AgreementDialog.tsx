import { Group, TextInput, Button } from '@mantine/core'
import { Dialog, DialogProps, Text } from '@mantine/core'
import React from 'react'

type AgreementDialogProps = DialogProps & {
    message: string;
    onAgree?: () => void;
    onDisagree?: () => void;
}
const AgreementDialog: React.FC<AgreementDialogProps> = ({ message, onAgree, onDisagree, children, ...props }) => {

    const handleAgree = () => {
        props.onClose?.();
        onAgree?.();
    }

    const handleDisagree = () => {
        props.onClose?.();
        onDisagree?.();
    }

    return (
        <Dialog size="lg" radius="md"
            withBorder
            {...props}>
            <Text size="sm" mb="xs" fw={500} ta='center'>{message}</Text>
            {children}
            <Group align="center" justify='center'>
                <Button variant='outline' onClick={handleDisagree}>Cancelar</Button>
                <Button variant='filled' onClick={handleAgree}>Confirmar</Button>
            </Group>
        </Dialog>
    )
}

export default AgreementDialog