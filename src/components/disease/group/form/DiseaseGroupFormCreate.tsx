import { LoadingOverlay, rem, Button, Flex } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import DiseaseGroupForm from "./DiseaseGroupForm";
import { useFetch } from "@/hooks/useFetch";
import { ModularBox } from "@/components/modular/box/ModularBox";
import { notifications } from "@mantine/notifications";
import { LayoutSubFormTitle } from "@/components/layout/sub/form/LayoutSubFormTitle";
import { DiseaseGroup } from "@/lib/dtos/disease/group/base.response.dto";

type DiseaseGroupFormCreateProps = {
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
    onFormSubmitted: (data: DiseaseGroup) => void;
}
const DiseaseGroupFormCreate: React.FC<DiseaseGroupFormCreateProps> = ({ onClose, onFormSubmitted }) => {

    const [shouldRequest, setShouldRequest] = useState<boolean>(false)

    const { body, data, error, loading, reload, request, reset } = useFetch<DiseaseGroup>('/api/diseases/groups', 'POST', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: Omit<DiseaseGroup, 'id' | 'diseases'>) => {
        request(data);
        setShouldRequest(true);
    }, [request]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    useEffect(() => {
        if (body && shouldRequest) {
            reload();
            setShouldRequest(false);
        }
    }, [body, shouldRequest, reload]);

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
                title={'Formulario de creacion de grupos de morbilidades'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <DiseaseGroupForm
                    ref={buttonRef}
                    onFormSubmitted={handleFormSubmittedEvent} />
            </ModularBox>

            <ModularBox direction='row'>
                <Button
                    onClick={handleClickEvent}
                    type="submit"
                    flex={1}
                    size='xs'
                    leftSection={(
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </Flex>
    </>;
}

export { DiseaseGroupFormCreate }