'use client'

import React, { useCallback } from 'react'
import selectDoctorSchema from '../_schema/select-doctor.schema'
import { joiResolver, useForm } from '@mantine/form';
import { Box, Select } from '@mantine/core';

type DoctorFormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & {
    options: { value: string, label: string }[];
    data?: {
        doctorDni: string;
        doctorFullname: string;
    }
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

    const handleSubmit = useCallback((data: any, event: any) => {
        console.log(data);
        onSubmit?.(event);
    }, [onSubmit]);

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
            <input type="hidden" name='doctorFullname' value={options.find(e => e.value === form.values.doctorDni)?.label ?? data?.doctorFullname ?? ''} />
        </Box>)
})

export default DoctorForm