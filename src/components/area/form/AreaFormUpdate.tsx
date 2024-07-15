import { ModularBox } from "@/components/modular/box/ModularBox";
import { useFetch } from "@/hooks/useFetch";
import { LoadingOverlay, Flex, rem, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useRef, useCallback, useEffect, useState } from "react";
import { LayoutSubFormTitle } from "@/components/layout/sub/form/LayoutSubFormTitle";
import { Area } from "@/lib/dtos/location/area/response.dto";
import { AreaForm } from "./AreaForm";

interface AreaFormUpdateProps {
    /**
     * Valores por defecto de la morbilidad a actualizar
     */
    area: Area;
    /**
     * Identificador unico de un grupo de morbilidades
     */
    management: number;
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     * @param value 
     * @returns 
     */
    onFormSubmitted: (value: Area) => void;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     * @returns 
     */
    onClose: () => void;
}
const AreaFormUpdate: React.FC<AreaFormUpdateProps> = ({ onClose, onFormSubmitted, area, management }) => {

    const {
        body: areaBody,
        data: areaData,
        error: areaError,
        loading: areaLoading,
        reload: areaReload,
        request: areaRequest,
        reset: areaReset,
    } = useFetch<Area>(`/api/area/${area ? area.id : ''}`, 'PATCH', { loadOnMount: false });

    const buttonRef = useRef<HTMLButtonElement>(null);

    const [shouldSendRequest, setShouldSendRequest] = useState<boolean>(false);

    const handleFormSubmittedEvent = useCallback((data: Omit<Area, 'id'>) => {
        areaRequest({ ...area, ...data, management });
        setShouldSendRequest(true)
    }, [areaRequest, area, management]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    useEffect(() => {
        if (areaBody && shouldSendRequest) {
            areaReload();
            setShouldSendRequest(false);
        }
    }, [areaBody, shouldSendRequest, areaReload]);

    useEffect(() => {
        if (areaData && areaBody) {
            onFormSubmitted({ ...area, ...areaBody });
            onClose();
            areaReset();
        }
    }, [areaData, area, areaBody, areaReset, onFormSubmitted, onClose]);

    useEffect(() => {
        if (areaError) notifications.show({ message: areaError.message });
    }, [areaError]);

    return <>
        <LoadingOverlay visible={areaLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de modificacion de morbilidades'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <AreaForm
                    ref={buttonRef}
                    formData={area}
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

export { AreaFormUpdate };