import { SelectorOption } from "@/lib";

export interface ISelectorService<P, K> {
    findSelectorOptions(params?: P): SelectorOption<K>[] | Promise<SelectorOption<K>[]>
}