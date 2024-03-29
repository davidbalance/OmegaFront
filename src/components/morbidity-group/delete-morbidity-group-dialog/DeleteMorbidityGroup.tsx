import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { DialogProps } from '@mantine/core';
import React from 'react'

type DeleteMorbidityGroupDialogProps = DialogProps & {
    onComplete: (id: number) => void;
}
const DeleteMorbidityGroupDialog: React.FC<DeleteMorbidityGroupDialogProps> = ({ onComplete, ...props }) => {

    const handleAgree = async () => {
        onComplete(0);
    }

    return (
        <AgreementDialog
            message={'El usuario sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props} />
    )
}

export default DeleteMorbidityGroupDialog