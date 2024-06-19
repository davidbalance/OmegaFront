'use client'

import { useCallback, useEffect, useState } from "react";
import { LocalStorageHookResult } from "./hook.types";

export const useLocalStorage = <T>(key: string, defaultValue: T): LocalStorageHookResult<T> => {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const currentValue = localStorage.getItem(key);
        setValue(currentValue ? JSON.parse(currentValue) : defaultValue);
    }, [key, defaultValue]);

    const save = useCallback((value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    }, [key]);

    const remove = useCallback(() => {
        localStorage.removeItem(key);
        setValue(defaultValue);
    }, [key, defaultValue]);

    return [value, { save, remove }];
}