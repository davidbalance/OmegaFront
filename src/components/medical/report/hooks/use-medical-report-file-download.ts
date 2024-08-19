import { blobFile } from "@/lib/utils/blob-to-file";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";
import { useMedicalReportFileBlob } from "./use-medical-report-file-blob";

const useMedicalReportFileDownload = (id: number, filename: string, cb?: () => void): [boolean, () => void] => {

    const savePdf = useCallback((blob: Blob) => {
        blobFile(blob, `${filename}.pdf`)
        notifications.show({ message: 'Descarga completa', color: 'green' });
        cb?.();
    }, [filename, cb]);

    const [loading, trigger] = useMedicalReportFileBlob(id, savePdf);

    return [loading, trigger];
}

export { useMedicalReportFileDownload };