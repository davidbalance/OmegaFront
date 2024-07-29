import { ModularBox } from "@/components/modular/box/ModularBox";
import { useFetch } from "@/hooks/useFetch";
import { LoadingOverlay, Flex, rem, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useRef, useCallback, useEffect } from "react";
import DiseaseFormGroup from "./DiseaseFormGroup";
import { LayoutSubFormTitle } from "@/components/layout/sub/form/LayoutSubFormTitle";
import { Disease } from "@/lib/dtos/disease/base.response.dto";
import { DiseaseGroup } from "@/lib/dtos/disease/group/base.response.dto";

interface DiseaseFormUpdateGroupProps {
    /**
     * Valores para la iniciacion por defecto del formulario.
     */
    disease: Disease;
    /**
     * Grupo al que pertenece la morbilidad.
     */
    group: number;
    /**
     * Grupos de morbilidades.
     */
    groups: { label: string, value: string }[]
    /**
     * Funcion que es llamada cuando se envia el formulario.
     * @param value 
     * @returns 
     */
    onFormSubmitted: (value: Disease & { group: number }) => void;
    /**
     * Funcion que es llamada cuando se llama al cierre del fomulario.
     * @returns 
     */
    onClose: () => void;
}
const DiseaseFormUpdateGroup: React.FC<DiseaseFormUpdateGroupProps> = ({ onClose, onFormSubmitted, disease, group, groups }) => {
    const { body, data, error, loading, reload, request, reset } = useFetch<DiseaseGroup>(`/api/diseases/${disease ? disease.id : ''}`, 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: { group: number }) => {
        request({ ...disease, ...data });
    }, [request, disease]);

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
            onFormSubmitted({ ...disease, ...body });
            onClose();
            reset();
        }
    }, [data, disease, body, reset, onFormSubmitted, onClose]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <LayoutSubFormTitle
                title={'Formulario de modificacion de morbilidades'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <DiseaseFormGroup
                    ref={buttonRef}
                    formData={{ group }}
                    onFormSubmitted={handleFormSubmittedEvent}
                    options={groups} />
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

export { DiseaseFormUpdateGroup };