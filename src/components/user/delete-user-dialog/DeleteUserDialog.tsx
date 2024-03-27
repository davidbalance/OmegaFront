import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { ICrudService, UserModel, UserViewService } from '@/services';
import { DialogProps } from '@mantine/core'
import React from 'react'

type DeleteUserDialogProps = DialogProps & {
    user: number;
    onComplete: (id: number) => void;
};
const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onComplete, ...props }) => {

    const userViewService: ICrudService<UserModel, number> = new UserViewService();

    const handleAgree = async () => {
        if (user <= 0) return;
        await userViewService.findOneAndDelete(user);
        onComplete(user);
    }

    return (
        <AgreementDialog
            message={'El usuario sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props} />
    )
}

export default DeleteUserDialog