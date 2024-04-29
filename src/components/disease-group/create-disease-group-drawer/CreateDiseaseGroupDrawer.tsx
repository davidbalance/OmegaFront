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
import { CreateDiseaseGroupRQ, DiseaseGroup as DiseaseType } from '@/services/api/disease-group/dtos';
import { DiseaseGroupService } from '@/services/api'
import { ICreateService } from '@/services/interfaces';

import endpoints from '@/services/endpoints/endpoints';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import DiseaseGroupForm, { DiseaseGroupFormProps } from '../disease-group-form/DiseaseGroupForm';
import { BaseFormProps } from '@/lib/types/base-form-prop';

const diseaseGroupService: ICreateService<CreateDiseaseGroupRQ, DiseaseType> =
    new DiseaseGroupService(endpoints.DISEASE_GROUP.V1);

type CreateDiseaseGroupDrawerProps = DrawerProps & BaseFormProps<DiseaseType>;
const CreateDiseaseGroupDrawer: React.FC<CreateDiseaseGroupDrawerProps> = ({ onFormSubmitted, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: CreateDiseaseGroupRQ) => {
        LoadDisclosure.open();
        try {
            const disease = await diseaseGroupService.create(data);
            onFormSubmitted(disease);
            props.onClose();
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Se ha producido un error al crear el grupo de morbilidades',
                color: 'red'
            });
        } finally {
            LoadDisclosure.close();
        }
    }

    return (
        <Drawer
            {...props}
            position='right'
            title="Formulario de grupo de morbilidades"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>

            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <DiseaseGroupForm
                onFormSubmitted={handleSubmit}
                ref={buttonRef} />

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

export default CreateDiseaseGroupDrawer