import { blobFile } from "@/lib/utils/blob-to-file";
import { MedicalFileZipPayload } from "@/server/medical_test/server_types";
import dayjs from "dayjs";

export const processBlob = async (body: MedicalFileZipPayload[]) => {
    const response = await fetch('/api/medical/file/multiple', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' }
    });
    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
    }
    const blob = await response.blob();
    blobFile(blob, `${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.zip`);
}