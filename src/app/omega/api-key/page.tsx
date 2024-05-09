'use client'

import React, { useState } from "react"
import { useDisclosure } from '@mantine/hooks';
import { useApiKey } from "@/hooks/useApiKey";
import { ApiKeyLayout } from "@/components/api-key/api-key-layout/ApiKeyLayout";
import CreateApiKeyForm from "@/components/api-key/create-api-key/CreateApiKeyForm";

enum LayoutStates {
    DEFAULT,
    CREATE
}

const ApiKey: React.FC = () => {

    const apiKeyHook = useApiKey();

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const [deleteState, DeleteDisclosure] = useDisclosure();

    const handleCreateEvent = () => { setCurrentState(LayoutStates.CREATE); }

    const handleClose = () => {
        apiKeyHook.clearSelected();
        setCurrentState(LayoutStates.DEFAULT);
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.CREATE]: <CreateApiKeyForm onClose={handleClose} />,
        [LayoutStates.DEFAULT]:
        <>
                <ApiKeyLayout
                    load={apiKeyHook.loading}
                    events={{
                        onCreate: handleCreateEvent,
                    }} />
        </>

    }

    return <>
        {
            view[currentState]
        }
    </>
}

export default ApiKey