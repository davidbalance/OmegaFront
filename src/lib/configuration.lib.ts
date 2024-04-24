import { NavLinkProp } from "./types/nav-link.type";

const CONFIGURATION_KEY = process.env.NEXT_PUBLIC_CONFIGURATION_KEY || 'CONFIGURATION-KEY'

type LogoProp = {
    name: string;
}

export type Configuration = {
    logo: LogoProp;
    resources: NavLinkProp[];
}

export const setConfiguration = (configuration: Configuration): void => {
    localStorage.setItem(CONFIGURATION_KEY, JSON.stringify(configuration));
}

export const getConfiguration = (): Configuration | undefined => {
    const configStr: string | null = localStorage.getItem(CONFIGURATION_KEY);
    if (!configStr) return undefined;
    return JSON.parse(configStr);
}

export const removeConfiguration = (): void => {
    localStorage.removeItem(CONFIGURATION_KEY);
}