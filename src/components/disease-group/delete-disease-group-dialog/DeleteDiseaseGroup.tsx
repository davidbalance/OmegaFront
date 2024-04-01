import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { DiseaseGroupService, FindDiseaseAndDeleteQR, IDeleteService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { DialogProps } from '@mantine/core';
import React from 'react'

type DeleteDiseaseGroupDialogProps = DialogProps & {
    onComplete: (id: number) => void;
}
const DeleteDiseaseGroupDialog: React.FC<DeleteDiseaseGroupDialogProps> = ({ onComplete, ...props }) => {

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

export default DeleteDiseaseGroupDialog