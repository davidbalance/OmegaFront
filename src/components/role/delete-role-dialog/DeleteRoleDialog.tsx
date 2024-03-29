import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { DialogProps } from '@mantine/core';
import React from 'react'

type DeleteRoleDialogProps = DialogProps & {
    roleIdentify: number;
    onComplete: (id: number) => void;
};
const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({ roleIdentify, onComplete, ...props }) => {

    const handleAgree = async () => {
        if (roleIdentify <= 0) return;
        onComplete(roleIdentify);
    }

    return (
        <AgreementDialog
            message={'El rol sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props} />
    )
}

export default DeleteRoleDialog