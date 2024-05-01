import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { useDisease } from '@/hooks';
import { DialogProps, LoadingOverlay } from '@mantine/core';
import React from 'react'

type DeleteUserDialogProps = DialogProps & {
    disease: number;
};
const DiseaseDeleteDialog: React.FC<DeleteUserDialogProps> = ({ disease, ...props }) => {

    const diseaseHook = useDisease();

    const handleAgree = () => {
        if (disease <= 0) return;
        try {
            diseaseHook.remove({ id: disease });
            props.onClose?.();
        } catch (error) { }
    }

    return (
        <AgreementDialog
            message={'La morbilidad sera eliminada, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props}>
            <LoadingOverlay visible={diseaseHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </AgreementDialog>
    )
}

export { DiseaseDeleteDialog }