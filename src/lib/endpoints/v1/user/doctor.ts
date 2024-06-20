import { root } from "../../config";

export const DOCTOR = {
    FIND_ALL: `${root}/doctors`,
    FIND_ONE_AND_UPLOAD_IMAGE: (key: number) => `${root}/doctors/signature/${key}`
}