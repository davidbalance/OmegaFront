import {
    Button,
    Drawer,
    DrawerProps,
    Group,
    LoadingOverlay,
    rem
} from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react';
import React,
{ useRef } from 'react'
import { SelectorOption } from '@/lib';
import { BaseFormProps } from '@/lib/types/base-form-prop';
import {
    CreateDiseaseRQ,
    DiseaseService,
    Disease as DiseaseType,
    ICreateService
} from '@/services';
import DiseaseForm from '../disease-form/DiseaseForm';
import { notifications } from '@mantine/notifications';
import endpoints from '@/services/endpoints/endpoints';
import { useDisclosure } from '@mantine/hooks';

const diseaseService: ICreateService<CreateDiseaseRQ, DiseaseType> = new DiseaseService(endpoints.DISEASE.V1);

type CreateDiseaseDrawerProps = DrawerProps & BaseFormProps<DiseaseType> & {
    options: SelectorOption<number>[];
};
const CreateDiseaseDrawer: React.FC<CreateDiseaseDrawerProps> = ({ onFormSubmitted, options, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFormSubmittion = async (data: CreateDiseaseRQ) => {
        LoadDisclosure.open();
        try {
            const disease = await diseaseService.create(data);
            onFormSubmitted(disease);
            props.onClose();
        } catch (error) {
            notifications.show({
                message: 'Se ha producido un error al crear la morbilidad'
            });
        } finally {
            LoadDisclosure.close();
        }
    }

    return (
        <Drawer
            {...props}
            position='right'
            title="Formulario de morbilidades"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>

            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <DiseaseForm
                ref={buttonRef}
                options={options}
                onFormSubmitted={(e) => handleFormSubmittion({ ...e, group: e.group })} />

            <Group justify="center" mt="xl">
                <Button
                    onClick={() => buttonRef.current?.click()}
                    leftSection={
                        <IconDeviceFloppy
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5} />}>Guardar
                </Button>
            </Group>
        </Drawer>
    )
}

export default CreateDiseaseDrawer