'use client'

import React, { useCallback, useState } from 'react'
import { notifications } from '@mantine/notifications';
import { CreateMedicalOrderPayload } from '@/server/medical-order/server-types';
import { Option } from '@/lib/types/option.type';
import DoctorSelectchema from '../_schema/doctor.schema';
import DoctorSelect from '@/components/doctor-select';

export type DoctorFormValue = Pick<CreateMedicalOrderPayload, 'doctorDni' | 'doctorFullname'>;
type DoctorFormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> & {
    options: Option[];
    data?: DoctorFormValue,
    onSubmit?: (value: DoctorFormValue) => void;
};
const DoctorForm = React.forwardRef<HTMLFormElement, DoctorFormProps>(({
    options,
    data,
    onSubmit,
    ...props
}, ref) => {

    const [formValue, setFormValue] = useState<DoctorFormValue>({
        doctorDni: data?.doctorDni ?? '',
        doctorFullname: data?.doctorFullname ?? '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();
            const safeValues = DoctorSelectchema.safeParse(formValue);
            if (safeValues.error) {
                notifications.show({ message: JSON.stringify(safeValues.error.errors), color: 'red' });
                return;
            }
            onSubmit?.(safeValues.data);
        }, [formValue, onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}
            {...props}>
            <DoctorSelect
                options={options}
                doctorValue={data?.doctorDni}
                onChange={(selectedValues) => {
                    setFormValue((prev) => {
                        const updatedForm: any = { ...prev };
                        selectedValues.forEach(({ label, value }) => {
                            updatedForm.doctorDni = value;
                            updatedForm.doctorFullname = label;
                        });
                        return updatedForm;
                    });
                }} />
        </form>)
});

DoctorForm.displayName = 'DoctorForm'

export default DoctorForm