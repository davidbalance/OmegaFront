import { ExtendedActionProps } from "@/components/_base/ActionMenu";
import { useMemo, useState } from "react";
import { Menu, rem } from "@mantine/core";
import { IconDownload, IconEye, IconPencil, IconUpload } from "@tabler/icons-react";
import BlobPreview from "@/components/blob/preview/BlobPreview";
import { MedicalReport } from "@/lib/dtos/medical/report/base.respoonse.dto";
import { useMedicalReportFileBlob } from "../hooks/use-medical-report-file-blob";
import { useMedicalReportFileDownload } from "../hooks/use-medical-report-file-download";

export type MedicalReportFileMenuProps<T> = ExtendedActionProps<T> & {
    data: MedicalReport;
    filename?: string;
    previewReportFile?: boolean;
    downloadReportFile?: boolean;
    onCreateReportFile?: () => void;
    onUploadReportFile?: () => void;
}

const menuWithMedicalReportFile = <T extends object>(
    WrappedComponent: React.ComponentType<ExtendedActionProps<T>>
): React.FC<MedicalReportFileMenuProps<T>> => {

    const hoc: React.FC<MedicalReportFileMenuProps<T>> = ({
        data,
        loading,
        children,
        filename = 'medical-report',
        previewReportFile = true,
        downloadReportFile = true,
        onCreateReportFile,
        onUploadReportFile,
        ...props }
    ) => {

        const [blob, setBlob] = useState<Blob | null>(null);

        const flag = useMemo(() => previewReportFile || downloadReportFile || onCreateReportFile || onUploadReportFile, [previewReportFile, downloadReportFile, onCreateReportFile, onUploadReportFile]);

        const handleBlob = (fileBlob: Blob) => setBlob(fileBlob);
        const [previewState, previewTrigger] = useMedicalReportFileBlob(data.id, handleBlob);
        const [downloadState, downloadTrigger] = useMedicalReportFileDownload(data.id, filename);

        const handleEventPreviewClose = () => setBlob(null);

        return (
            <>
                <BlobPreview
                    blob={blob}
                    opened={!!blob}
                    onClose={handleEventPreviewClose} />
                <WrappedComponent
                    loading={loading || downloadState || previewState}
                    {...props as ExtendedActionProps<T>}>
                    {children}
                    {(flag) && <Menu.Label>Reportes medicos</Menu.Label>}
                    {onCreateReportFile && (
                        <Menu.Item
                            onClick={onCreateReportFile}
                            leftSection={(
                                <IconPencil style={{ width: rem(14), height: rem(14) }} />
                            )}>
                            Elaborar reporte
                        </Menu.Item>
                    )}
                    {downloadReportFile && (
                        <Menu.Item
                            onClick={downloadTrigger}
                            leftSection={(
                                <IconDownload style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Descargar reporte
                        </Menu.Item>
                    )}
                    {(downloadReportFile && previewReportFile) && (
                        <Menu.Item
                            onClick={previewTrigger}
                            leftSection={(
                                <IconEye style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Visualizar reporte
                        </Menu.Item>
                    )}
                    {onUploadReportFile && (
                        <Menu.Item
                            onClick={onUploadReportFile}
                            leftSection={(
                                <IconUpload style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Subir reporte
                        </Menu.Item>
                    )}
                </WrappedComponent>
            </>
        );
    }

    return hoc;
}

export { menuWithMedicalReportFile }; 