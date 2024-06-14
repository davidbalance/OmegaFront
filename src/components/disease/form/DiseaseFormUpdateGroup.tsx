import { ModularBox } from "@/components/modular-box/ModularBox";
import { SubLayoutFormTitle } from "@/components/sub-layout-form/SubLayoutTitle";
import { useFetch } from "@/hooks/useFetch/useFetch";
import { LoadingOverlay, Flex, rem, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useRef, useCallback, useEffect } from "react";
import DiseaseFormGroup from "./DiseaseFormGroup";
import { DiseaseGroup } from "@/lib/dtos/disease/group/response.dto";
import { Disease } from "@/lib/dtos/disease/response.dto";

type DiseaseFormUpdateGroupProps = {
    disease: Disease;
    group: number;
    groups: { label: string, value: string }[]
    onFormSubmitted: (value: Disease & { group: number }) => void;
    onClose: () => void;
}
const DiseaseFormUpdateGroup: React.FC<DiseaseFormUpdateGroupProps> = ({ onClose, onFormSubmitted, disease, group, groups }) => {
    const { body, data, error, loading, reload, request, reset } = useFetch<DiseaseGroup>(`/api/diseases/${disease ? disease.id : ''}`, 'PATCH', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: { group: number }) => {
        request({ ...disease, ...data });
    }, [request]);

    const handleClickEvent = useCallback(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, [buttonRef.current]);

    useEffect(() => {
        if (body) {
            reload();
        }
    }, [body]);

    useEffect(() => {
        if (data && body) {
            onFormSubmitted({ ...disease, ...body });
            onClose();
            reset();
        }
    }, [data, body, reset, onFormSubmitted]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <SubLayoutFormTitle
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