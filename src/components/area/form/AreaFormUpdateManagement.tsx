import { ModularBox } from "@/components/modular/box/ModularBox";
import { useFetch } from "@/hooks/useFetch";
import { LoadingOverlay, Flex, rem, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useRef, useCallback, useEffect } from "react";
import { LayoutSubFormTitle } from "@/components/layout/sub/form/LayoutSubFormTitle";
import AreaFormManagement from "./AreaFormManagement";
import { Area } from "@/lib/dtos/location/area/base.response.dto";

interface AreaFormUpdateManagementProps {
    /**
     * Valores para la iniciacion por defecto del formulario.
     */
    area: Area;
    /**
     * Grupo al que pertenece la morbilidad.
     */
    management: number;
    /**
     * Grupos de morbilidades.
     */
    managements: { label: string, value: string }[]
    /**
     * Funcion que es llamada cuando se envia el formulario.
     * @param value 
     * @returns 
     */
    onFormSubmitted: (value: Area & { management: number }) => void;
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     * @returns 
     */
    onClose: () => void;
}
const AreaFormUpdateManagement: React.FC<AreaFormUpdateManagementProps> = ({ onClose, onFormSubmitted, area, management, managements }) => {
    const { body, data, error, loading, reload, request, reset } = useFetch<Area>(`/api/area/${area ? area.id : ''}`, 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: { management: number }) => {
        request({ ...area, ...data });
    }, [request, area]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    useEffect(() => {
        if (body) {
            reload();
        }
    }, [body, reload]);

    useEffect(() => {
        if (data && body) {
            onFormSubmitted({ ...area, ...body });
            onClose();
            reset();
        }
    }, [data, area, body, reset, onFormSubmitted, onClose]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de modificacion de areas'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <AreaFormManagement
                    ref={buttonRef}
                    formData={{ management }}
                    onFormSubmitted={handleFormSubmittedEvent}
                    options={managements} />
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

export { AreaFormUpdateManagement };