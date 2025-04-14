'use client'

import { createContext, useContext, useState } from "react";

interface TableContextProps {
    isScrolled: boolean;
    setScroll: (value: boolean) => void
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTable must be used within a TableProvider');
    }
    return context;
}

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const setScroll = (value: boolean) => setIsScrolled(value);

    const value = { isScrolled, setScroll };

    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
}