import { root } from "@/lib/endpoints/config";

export const LAB_EXAM = {
    UPDATE_ONE: (id: number) => `${root}/exams/${id}`
}