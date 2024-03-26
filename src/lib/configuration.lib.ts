const CONFIGURATION_KEY = process.env.NEXT_PUBLIC_CONFIGURATION_KEY || 'CONFIGURATION-KEY'

export const setConfiguration = (configuration: any): void => {
    sessionStorage.setItem(CONFIGURATION_KEY, JSON.stringify(configuration));
}

export const getConfiguration = (): any => {
    const configuration: string | null = sessionStorage.getItem(CONFIGURATION_KEY);
    if (!configuration) throw new Error("Configuration not found");
    return JSON.parse(configuration);
}

export const removeConfiguration = (): void => {
    sessionStorage.removeItem(CONFIGURATION_KEY);
}