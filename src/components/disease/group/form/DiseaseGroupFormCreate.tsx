import { SubLayoutFormTitle } from "@/components/sub-layout-form/SubLayoutTitle";
import { LoadingOverlay, rem, Button, Flex } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useCallback, useEffect, useRef } from "react";
import DiseaseGroupForm from "./DiseaseGroupForm";
import { useFetch } from "@/hooks/useFetch/useFetch";
import { ModularBox } from "@/components/modular-box/ModularBox";
import { notifications } from "@mantine/notifications";
import { DiseaseGroup } from "@/lib/dtos/disease/group/response.dto";

type DiseaseGroupFormCreateProps = {
    onClose: () => void;
    onFormSubmitted: (data: DiseaseGroup) => void;
}
const DiseaseGroupFormCreate: React.FC<DiseaseGroupFormCreateProps> = ({ onClose, onFormSubmitted }) => {

    const { body, data, error, loading, reload, request, reset } = useFetch<DiseaseGroup>('/api/diseases/groups', 'POST', { loadOnMount: false });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittedEvent = useCallback((data: Omit<DiseaseGroup, 'id' | 'diseases'>) => {
        request(data);
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
        if (data) {
            onFormSubmitted(data);
            onClose();
            reset();
        }
    }, [data, reset, onFormSubmitted]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    return <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex h='100%' direction='column' gap={rem(8)}>
            <SubLayoutFormTitle
                title={'Formulario de creacion de groupos de morbilidades'}
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
                    leftSection={<IconDeviceFloppy
                        style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                    Guardar
                </Button>
            </ModularBox>
        </Flex>
    </>;
}

export { DiseaseGroupFormCreate }