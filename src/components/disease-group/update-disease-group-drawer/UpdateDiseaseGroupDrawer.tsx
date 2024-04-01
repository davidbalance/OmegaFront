import { Button, Drawer, DrawerProps, Group, LoadingOverlay, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import { DiseaseGroup as DiseaseGroupType, DiseaseGroupService, FindDiseaseGroupAndUpdateRQ, IUpdateService } from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import { useDisclosure } from '@mantine/hooks';
import DiseaseGroupForm from '../disease-group-form/DiseaseGroupForm';
import { notifications } from '@mantine/notifications';

const diseaseGroupService: IUpdateService<FindDiseaseGroupAndUpdateRQ, void> = new DiseaseGroupService(endpoints.DISEASE_GROUP.V1);

type UpdateDiseaseGroupDrawerProps = DrawerProps & {
    disease: DiseaseGroupType
};
const UpdateDiseaseGroupDrawer: React.FC<UpdateDiseaseGroupDrawerProps> = ({ disease, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (data: any) => {
        LoadDisclosure.open();
        try {
            await diseaseGroupService.findOneAndUpdate({ id: disease.id, ...data });
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
                data={disease}
                onSubmit={handleSubmit}
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

export default UpdateDiseaseGroupDrawer