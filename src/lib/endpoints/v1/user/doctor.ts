import { root } from "../../config";

export const DOCTOR = {
    FIND_ALL: `${root}/doctors`,
    FIND_ONE_IMAGE: (key: number) => `${root}/doctors/files/signature/${key}`,
    UPLOAD_IMAGE: (key: number) => `${root}/doctors/files/signature/${key}`
}