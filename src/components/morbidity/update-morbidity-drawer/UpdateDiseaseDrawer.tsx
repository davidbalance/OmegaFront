import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import DiseaseForm from '../disease-form/DiseaseForm';
import { DiseaseGroup as DiseaseGroupType } from '@/services';
import { SelectorOption } from '@/lib';

type UpdateDiseaseDrawerProps = DrawerProps & {
    groups: SelectorOption<number>[];
    data: any
};
const UpdateDiseaseDrawer: React.FC<UpdateDiseaseDrawerProps> = ({ data, groups, ...props }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (data: any) => {
        console.log(data);
        props.onClose()
    }

    return (
        <Drawer
            {...props}
            position='right'
            title="Formulario de morbilidades"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>

            <DiseaseForm
                data={data}
                onSubmit={handleSubmit}
                ref={buttonRef}
                groups={groups} />

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