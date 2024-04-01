import { Button, Drawer, DrawerProps, Group, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useRef } from 'react'
import MorbidityForm from '../disease-form/DiseaseForm';
import { SelectorOption } from '@/lib';

type CreateMorbidityDrawerProps = DrawerProps & { groups: SelectorOption<number>[]; };
const CreateMorbidityDrawer: React.FC<CreateMorbidityDrawerProps> = ({ groups, ...props }) => {

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

export default CreateMorbidityDrawer