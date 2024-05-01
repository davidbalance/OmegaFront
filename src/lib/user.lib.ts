import { User } from "@/services/api/user/dtos";

const USER_KEY = process.env.NEXT_PUBLIC_USER_KEY || 'USER-KEY'
export type ConfigurationUser = Omit<User, 'id'>;

export const setUser = (user: ConfigurationUser): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const getUser = (): ConfigurationUser | undefined => {
    const configStr: string | null = localStorage.getItem(USER_KEY);
    if (!configStr) return undefined;
    return JSON.parse(configStr);
}

export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
}