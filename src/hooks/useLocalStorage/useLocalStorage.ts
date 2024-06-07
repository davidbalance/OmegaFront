'use client'

import { useEffect, useState } from "react";

type LocalStorageHookHandler<T> = {
    save: (value: T) => void;
    remove: () => void;
}

type LocalStorageHookResult<T> = [value: T, handlers: LocalStorageHookHandler<T>]

export const useLocalStorage = <T>(key: string, defaultValue: T): LocalStorageHookResult<T> => {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const currentValue = localStorage.getItem(key);
        setValue(currentValue ? JSON.parse(currentValue) : defaultValue);
    }, [key])


    const save = (value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    }

    const remove = () => {
        localStorage.removeItem(key);
        setValue(defaultValue);
    }

    return [value, { save, remove }];
}