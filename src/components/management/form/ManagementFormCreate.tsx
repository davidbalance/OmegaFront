import { LoadingOverlay, rem, Button, Flex } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { ModularBox } from "@/components/modular/box/ModularBox";
import { notifications } from "@mantine/notifications";
import { LayoutSubFormTitle } from "@/components/layout/sub/form/LayoutSubFormTitle";
import { Management } from "@/lib/dtos/location/management/response.dto";
import { ManagementForm } from "./ManagementForm";

type ManagementFormCreateProps = {
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     * @returns 
     */
    onClose: () => void;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     * @param data 
     * @returns 
     */
    onFormSubmitted: (data: Management) => void;
}
const ManagementFormCreate: React.FC<ManagementFormCreateProps> = ({ onClose, onFormSubmitted }) => {

    const { body, data, error, loading, reload, request, reset } = useFetch<Management>('/api/management', 'POST', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const handleFormSubmittedEvent = useCallback((data: Omit<Management, 'id' | 'areas'>) => {
        request(data);
        setShouldSendRequest(true);
    }, [request]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    useEffect(() => {
        if (body && shouldSendRequest) {
            reload();
            setShouldSendRequest(false);
        }
    }, [body, reload, shouldSendRequest]);

    useEffect(() => {
        if (data) {
            onFormSubmitted(data);
            onClose();
            reset();
        }
    }, [data, reset, onClose, onFormSubmitted]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de creacion de gerencias'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <ManagementForm
                    ref={buttonRef}
                    onFormSubmitted={handleFormSubmittedEvent} />
            </ModularBox>

            <ModularBox direction='row'>
                <Button
                    onClick={handleClickEvent}
                    type="submit"
                    flex={1}
                    size='xs'
                    leftSection={<IconDeviceFloppy
                        style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                    Guardar
                </Button>
            </ModularBox>
        </Flex>
    </>;
}

export { ManagementFormCreate }