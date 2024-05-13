import AgreementDialog from '@/components/dialog/agreement-dialog/AgreementDialog';
import { useApiKey } from '@/hooks/useApiKey';
import { DialogProps, LoadingOverlay } from '@mantine/core';
import React from 'react'

type ApiKeyDeleteDialogProps = DialogProps & {
    api: number;
}
const ApiKeyDeleteDialog: React.FC<ApiKeyDeleteDialogProps> = ({ api, ...props }) => {

    const apiKeyHook = useApiKey();

    const handleAgree = () => {
        if (api <= 0) return;
        try {
            apiKeyHook.remove({ id: api });
            props.onClose?.();
        } catch (error) { }
    }

    return (
        <AgreementDialog
            message={'El ApiKey sera eliminado, ¿esta seguro?'}
            onAgree={handleAgree}
            {...props}>
            <LoadingOverlay visible={apiKeyHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        </AgreementDialog>
    )
}

export default ApiKeyDeleteDialog