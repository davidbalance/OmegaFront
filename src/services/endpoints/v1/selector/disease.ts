import { root } from "@/services/endpoints/config";

export const DISEASE_SELECTOR = (group: number) => `${root}/diseases/selector/${group}`;