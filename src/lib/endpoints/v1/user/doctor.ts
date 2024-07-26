import { root } from "../../config";

export const DOCTOR = {
    FIND_ALL: `${root}/doctors`,
    UPLOAD_IMAGE: (key: number) => `${root}/doctors/files/signature/${key}`
}