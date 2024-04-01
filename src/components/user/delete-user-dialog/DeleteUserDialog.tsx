import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { FindUserAndDeleteRQ, IDeleteService, UserService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { DialogProps } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import React from 'react'

const userService: IDeleteService<FindUserAndDeleteRQ, void> = new UserService(endpoints.USER.V1);

type DeleteUserDialogProps = DialogProps & {
    user: number;
    onComplete?: () => void;
};
const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ user, onComplete, ...props }) => {

    const handleAgree = async () => {
        if (user <= 0) return;
        try {
            await userService.findOneAndDelete({ id: user });
            onComplete?.();
            props.onClose?.();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Se ha producido un error al eliminar el usuario',
                color: 'red'
            });
        }
    }

    return (
        <AgreementDialog
            message={'El usuario sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props} />
    )
}

export default DeleteUserDialog