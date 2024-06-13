import { root } from "@/lib/endpoints/config";

export const DISEASE_SELECTOR = (group: number) => `${root}/diseases/selector/${group}`;