import { root } from "@/lib/endpoints/config";

export const COMPANY_SELECTOR = (group: number) => `${root}/selector/companies/${group}`;