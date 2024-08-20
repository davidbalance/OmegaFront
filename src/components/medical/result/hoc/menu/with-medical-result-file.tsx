import { ExtendedActionProps } from "@/components/_base/ActionMenu";
import { useMemo, useState } from "react";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { Menu, rem } from "@mantine/core";
import { IconDownload, IconEye, IconTrash, IconUpload } from "@tabler/icons-react";
import BlobPreview from "@/components/blob/preview/BlobPreview";
import { useMedicalResultFileDownload } from "../../hooks/use-medical-result-file-download";
import { useMedicalResultFileBlob } from "../../hooks/use-medical-result-file-blob";
import { useMedicalResultFileDelete } from "../../hooks/use-medical-result-file-delete";

type MedicalResultFileProps<T> = ExtendedActionProps<T> & {
    result: MedicalResult;
    previewResultFile?: boolean;
    downloadResultFile?: boolean;
    onUploadResultFile?: () => void;
    onDeleteResultFile?: () => void;
}

const withMedicalResultFile = <T extends object>(
    WrappedComponent: React.ComponentType<ExtendedActionProps<T> & { result?: MedicalResult }>
): React.FC<MedicalResultFileProps<T>> => {

    const hoc: React.FC<MedicalResultFileProps<T>> = ({
        result: data,
        loading,
        children,
        previewResultFile = true,
        downloadResultFile = true,
        onUploadResultFile,
        onDeleteResultFile,
        ...props }
    ) => {

        const [blob, setBlob] = useState<Blob | null>(null);

        const shouldShowResultLabel = useMemo(
            () => (data.hasFile && (previewResultFile || downloadResultFile || onDeleteResultFile)) || onUploadResultFile
            , [data.hasFile, previewResultFile, downloadResultFile, onDeleteResultFile, onUploadResultFile]);

        const handleBlob = (fileBlob: Blob) => setBlob(fileBlob);
        const [previewState, previewTrigger] = useMedicalResultFileBlob(data.id, handleBlob);
        const [downloadState, downloadTrigger] = useMedicalResultFileDownload(data.id, data.examName);
        const [deleteState, deleteTrigger] = useMedicalResultFileDelete(data.id, onDeleteResultFile);

        const handleEventPreviewClose = () => setBlob(null);

        return (
            <>
                <BlobPreview
                    blob={blob}
                    opened={!!blob}
                    onClose={handleEventPreviewClose} />
                <WrappedComponent
                    result={data}
                    loading={loading || downloadState || previewState || deleteState}
                    {...props as ExtendedActionProps<T>}>
                    {children}
                    {(shouldShowResultLabel) && <Menu.Label>Resultado medicos</Menu.Label>}
                    {(data.hasFile && downloadResultFile) && (
                        <Menu.Item
                            onClick={downloadTrigger}
                            leftSection={(
                                <IconDownload style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Descargar resultado
                        </Menu.Item>
                    )}
                    {(data.hasFile && previewResultFile) && (
                        <Menu.Item
                            onClick={previewTrigger}
                            leftSection={(
                                <IconEye style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Visualizar resultado
                        </Menu.Item>
                    )}
                    {onUploadResultFile && (
                        <Menu.Item
                            onClick={onUploadResultFile}
                            leftSection={(
                                <IconUpload style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Subir resultado
                        </Menu.Item>
                    )}
                    {(data.hasFile && onDeleteResultFile) && (
                        <Menu.Item
                            color="red"
                            onClick={deleteTrigger}
                            leftSection={(
                                <IconTrash style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Eliminar Archivo
                        </Menu.Item>
                    )}
                </WrappedComponent>
            </>
        );
    }

    hoc.displayName = `withMedicalResultFile(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return hoc;
}

export { withMedicalResultFile }; 