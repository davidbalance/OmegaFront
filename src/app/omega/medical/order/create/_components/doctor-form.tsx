'use client'

import React, { useCallback } from 'react'
import selectDoctorSchema from '../_schema/select-doctor.schema'
import { joiResolver, useForm } from '@mantine/form';
import { Box, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';

type DoctorFormValue = {
    doctorDni: string;
    doctorFullname: string;
}
type DoctorFormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> & {
    options: { value: string, label: string }[];
    data?: DoctorFormValue,
    onSubmit?: (value: DoctorFormValue) => void;
};
const DoctorForm = React.forwardRef<HTMLFormElement, DoctorFormProps>(({
    options,
    data,
    onSubmit,
    ...props
}, ref) => {

    const form = useForm({
        initialValues: {
            doctorDni: data?.doctorDni ?? ''
        },
        validate: joiResolver(selectDoctorSchema)
    });

    const handleSubmit = useCallback((values: Omit<DoctorFormValue, 'doctorFullname'>) => {

        const doctorFullname = options.find(e => e.value === values.doctorDni)?.label ?? data?.doctorFullname ?? undefined;
        if (!doctorFullname) {
            notifications.show({ message: 'Ha ocurrido un error al enviar la data' });
            return;
        }
        onSubmit?.({ ...values, doctorFullname });
    }, [onSubmit, data, options]);

    return (
        <Box
            component='form'
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}
            {...props}>
            <Select
                data={options}
                label="Medico"
                placeholder="Escoge a un medico"
                nothingFoundMessage="Medico no encontrado..."
                checkIconPosition="left"
                defaultDropdownOpened={false}
                searchable
                clearable
                maxDropdownHeight={200}
                name='doctorDni'
                {...form.getInputProps('doctorDni')} />
        </Box>)
});

DoctorForm.displayName = 'DoctorForm'

export default DoctorForm