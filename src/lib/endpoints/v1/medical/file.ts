import { root } from "../../config";

export const MEDICAL_FILE = {
    DOWNLOAD_SINGLE_FILE: `${root}/medical/file`,
    DOWNLOAD_MULTIPLE_FILE: `${root}/medical/file/multiple`,
    DELETE_FILE: (type: string, id: string) => `${root}/medical/file/${type}/${id}`
}