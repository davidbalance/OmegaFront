import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { useRole } from '@/hooks';
import { DialogProps } from '@mantine/core';
import React from 'react'

type DeleteRoleDialogProps = DialogProps & {
    roleIdentify: number;
};
const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({ roleIdentify, ...props }) => {

    const roleHook = useRole();

    const handleAgree = async () => {
        if (roleIdentify <= 0) return;
        try {
            roleHook.remove({ id: roleIdentify });
            props.onClose?.();
        } catch (error) { }
    }

    return (
        <AgreementDialog
            message={'El rol sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props} />
    )
}

export default DeleteRoleDialog