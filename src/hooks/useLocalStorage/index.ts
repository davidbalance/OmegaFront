'use client'

import { useCallback, useEffect, useState } from "react";
import { LocalStorageHookResult } from "./hook.types";

export const useLocalStorage = <T>(key: string, defaultValue: T): LocalStorageHookResult<T> => {
    const [value, setValue] = useState<T>(defaultValue);
    const [defaultValueState, setDefaultValueState] = useState<T>(defaultValue)

    useEffect(() => {
        const currentValue = localStorage.getItem(key);
        setValue(currentValue ? JSON.parse(currentValue) : defaultValueState);
    }, [key, defaultValueState]);

    const save = useCallback((value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    }, [key]);

    const remove = useCallback(() => {
        localStorage.removeItem(key);
        setValue(defaultValueState);
    }, [key, defaultValueState]);

    return [value, { save, remove }];
}