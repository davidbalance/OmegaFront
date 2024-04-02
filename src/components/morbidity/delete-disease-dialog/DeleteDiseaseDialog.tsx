import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { BaseDeleteProp } from '@/lib/types/base-delete-prop';
import { DiseaseService, FindDiseaseAndDeleteQR, IDeleteService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { DialogProps, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React from 'react'

const diseaseService: IDeleteService<FindDiseaseAndDeleteQR, void> = new DiseaseService(endpoints.DISEASE.V1);

type DeleteDiseaseDialogProps = DialogProps & BaseDeleteProp<number>;
const DeleteDiseaseDialog: React.FC<DeleteDiseaseDialogProps> = ({ target, onComplete, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const handleAgree = async () => {
        LoadDisclosure.open();
        try {
            await diseaseService.findOneAndDelete({ id: target });
            onComplete(target);
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Se ha producido un error al eliminar el grupo de morbilidades',
                color: 'red'
            })
        } finally {
            LoadDisclosure.close();
            props.onClose?.();
        }
    }

    return (
        <AgreementDialog
            message={'La mobilidad sera eliminada, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props}>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </AgreementDialog>
    )
}

export default DeleteDiseaseDialog