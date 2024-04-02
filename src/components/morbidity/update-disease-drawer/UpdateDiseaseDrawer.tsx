import {
    Button,
    Drawer,
    DrawerProps,
    Group,
    LoadingOverlay,
    rem
} from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseForm, { IDiseaseForm } from '../disease-form/DiseaseForm';
import { SelectorOption } from '@/lib';
import { BaseFormProps } from '@/lib/types/base-form-prop';
import { DiseaseService, Disease as DiseaseType, FindDiseaseAndUpdateRQ, FindDiseaseAndUpdateRS, IUpdateService } from '@/services';
import { notifications } from '@mantine/notifications';
import endpoints from '@/services/endpoints/endpoints';
import { useDisclosure } from '@mantine/hooks';

const diseaseService: IUpdateService<FindDiseaseAndUpdateRQ, DiseaseType> = new DiseaseService(endpoints.DISEASE.V1);

type UpdateDiseaseDrawerProps = DrawerProps & BaseFormProps<Omit<DiseaseType, 'formData'>> & {
    formData: DiseaseType;
    options: SelectorOption<number>[];
};
const UpdateDiseaseDrawer: React.FC<UpdateDiseaseDrawerProps> = ({ onFormSubmitted, options, formData, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: IDiseaseForm) => {
        try {
            const disease = await diseaseService.findOneAndUpdate({ id: formData.id, ...data });
            onFormSubmitted(disease);
            props.onClose();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Se ha producido un error al actualizar la morbilidad',
                color: 'red'
            });
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
                formData={{ ...formData, group: formData.group.id }}
                ref={buttonRef}
                onFormSubmitted={(e) => handleSubmit({ ...e })}
                options={options} />

            <Group justify="center" mt="xl">
                <Button
                    onClick={() => buttonRef.current?.click()}
                    leftSection={
                        <IconDeviceFloppy
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5} />}>
                    Guardar
                </Button>
            </Group>
        </Drawer>
    )
}

export default UpdateDiseaseDrawer