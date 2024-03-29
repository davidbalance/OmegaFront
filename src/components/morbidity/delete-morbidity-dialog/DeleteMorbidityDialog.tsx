import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { DialogProps } from '@mantine/core';
import React from 'react'

type DeleteMorbidityDialogProps = DialogProps & {
    onComplete: (id: number) => void;
}
const DeleteMorbidityDialog: React.FC<DeleteMorbidityDialogProps> = ({ onComplete, ...props }) => {

    const handleAgree = async () => {
        onComplete(0);
    }

    return (
        <AgreementDialog
            message={'La mobilidad sera eliminada, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props} />
    )
}

export default DeleteMorbidityDialog