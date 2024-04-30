import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { useDiseaseGroup } from '@/hooks';
import { BaseDeleteProp } from '@/lib/types/base-delete-prop';
import { DialogProps, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react'

type DiseaseGroupDeleteProps = DialogProps & BaseDeleteProp<number>;
const DiseaseGroupDelete: React.FC<DiseaseGroupDeleteProps> = ({ target, ...props }) => {

    const diseaseGroupHook = useDiseaseGroup();

    const handleAgree = () => {
        try {
            diseaseGroupHook.remove({ id: target });
            props.onClose?.();
        } catch (error) { }
    }

    return (
        <AgreementDialog
            message={'El usuario sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props}>
            <LoadingOverlay visible={diseaseGroupHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </AgreementDialog>
    )
}

export default DiseaseGroupDelete