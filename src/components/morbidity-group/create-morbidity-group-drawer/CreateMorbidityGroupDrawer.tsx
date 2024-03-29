import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import MorbidityGroupForm from '../morbidity-group-form/MorbidityGroupForm';

type CreateMorbidityGroupDrawerProps = DrawerProps;
const CreateMorbidityGroupDrawer: React.FC<CreateMorbidityGroupDrawerProps> = ({ ...props }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (data: any) => {
        console.log(data);
        props.onClose()
    }

    return (
        <Drawer
            {...props}
            position='right'
            title="Formulario de grupo de morbilidades"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='lg'>

            <MorbidityGroupForm
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

export default CreateMorbidityGroupDrawer