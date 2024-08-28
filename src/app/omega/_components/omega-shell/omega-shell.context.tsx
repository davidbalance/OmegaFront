'use client'

import { createContext, useContext, useState } from "react";

interface OmegaShellContextProps {
    locked: boolean;
    opened: boolean;
    toggle: () => void;
    lock: () => void;
}

const OmegaShellContext = createContext<OmegaShellContextProps | undefined>(undefined);

export const useOmegaShell = () => {
    const context = useContext(OmegaShellContext);
    if (!context) {
        throw new Error('useOmegaShell must be used within a OmegaShellProvider');
    }
    return context;
}

export const OmegaShellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [opened, setOpened] = useState<boolean>(false);
    const [locked, setLocked] = useState<boolean>(false)

    const toggle = () => setOpened(prev => !prev);
    const lock = () => setLocked(prev => !prev);

    const value = {
        opened: locked || opened,
        locked,
        toggle,
        lock
    };

    return (
        <OmegaShellContext.Provider value={value}>
            {children}
        </OmegaShellContext.Provider>
    );
}