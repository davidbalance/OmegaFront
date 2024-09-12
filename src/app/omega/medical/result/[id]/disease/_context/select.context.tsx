'use client'

import React, { createContext, useContext, useState } from 'react'

interface SelectContextProps<T extends object> {
    value?: any;
    select: (value: any) => void;
    clear: () => void;
}

const SelectContext = createContext<SelectContextProps<any> | undefined>(undefined);

export const useSelect = <T extends object>() => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('useSelect must be used within a SelectProvider');
    }
    return context as SelectContextProps<T>;
}

const SelectProvider = <T extends object>({
    children
}: { children: React.ReactNode }) => {

    const [value, setValue] = useState<T | undefined>(undefined);

    const select = (data: T): void => setValue(data);
    const clear = (): void => setValue(undefined);

    return (
        <SelectContext.Provider value={{ value, select, clear }}>
            {children}
        </SelectContext.Provider>
    )
}

export default SelectProvider