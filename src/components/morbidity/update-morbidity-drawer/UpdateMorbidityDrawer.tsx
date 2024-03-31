import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import MorbidityForm from '../morbidity-form/MorbidityForm';
import { MorbidityGroupModel } from '@/services';

type UpdateMorbidityDrawerProps = DrawerProps & {
    groups: MorbidityGroupModel[];
    data: any
};
const UpdateMorbidityDrawer: React.FC<UpdateMorbidityDrawerProps> = ({ data, groups, ...props }) => {

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

            <MorbidityForm
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
                            stroke={1.5} />}>Guardar
                </Button>
            </Group>
        </Drawer>
    )
}

export default UpdateMorbidityDrawer