import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type LinkProp = {
    link: string;
    label: string;
    icon?: string;
}

export type SelectorOption<T> = {
    key: T,
    label: string;
}

export type FindSelectorOptions<T> = {
    options: SelectorOption<T>[]
}