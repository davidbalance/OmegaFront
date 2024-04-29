import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { useUser } from '@/hooks/useUser';
import { DialogProps, LoadingOverlay } from '@mantine/core'
import React from 'react'

type DeleteUserDialogProps = DialogProps & {
    user: number;
};
const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, ...props }) => {

    const userHook = useUser();

    const handleAgree = () => {
        if (user <= 0) return;
        try {
            userHook.remove({ id: user });
            props.onClose?.();
        } catch (error) { }
    }

    return (
        <AgreementDialog
            message={'El usuario sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props}>
            <LoadingOverlay visible={userHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </AgreementDialog>
    )
}

export default DeleteUserDialog