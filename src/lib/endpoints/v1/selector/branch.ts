import { root } from "@/lib/endpoints/config";

export const BRANCH_SELECTOR = (company: number) => `${root}/selector/branches/${company}`;