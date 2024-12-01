import React, { FormEvent, useCallback } from 'react'
import { LaboratoryValue, useMedicalOrderLaboratory } from '../_context/medical-order-laboratory.context';
import { Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
//     onSubmit?: (data: { exams: LaboratoryValue[] }) => void;

type MedicalOrderLaboratoryTrigger = Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> & {
    onSubmit?: (data: { exams: LaboratoryValue[] }) => void;
}
const MedicalOrderLaboratoryTrigger = React.forwardRef<HTMLFormElement, MedicalOrderLaboratoryTrigger>(({
    onSubmit,
    ...props
}, ref) => {

    const { exams } = useMedicalOrderLaboratory();

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!exams.length) {
            notifications.show({ message: 'Debe introducir al menos un examen' });
            return;
        }
        onSubmit?.({ exams });
    }, [onSubmit, exams]);

    return (
        <Box
            style={{ display: 'none' }}
            component='form'
            onSubmit={handleSubmit}
            ref={ref}
            {...props} />
    )
});

MedicalOrderLaboratoryTrigger.displayName = 'MedicalOrderLaboratoryTrigger'

export default MedicalOrderLaboratoryTrigger