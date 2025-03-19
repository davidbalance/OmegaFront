'use client'

import React, { useMemo } from 'react'
import CascadingSelect, { CascadingSelectValue } from './cascading-select';
import { DoctorOption } from '@/server/doctor/server_types';

type DoctorSelectProps = Pick<React.ComponentProps<typeof CascadingSelect>, 'onChange' | 'clean'> & {
    options: DoctorOption[];
    doctorValue?: string;
}
const DoctorSelect: React.FC<DoctorSelectProps> = ({
    options,
    doctorValue,
    ...props
}) => {

    const defaultDoctor = useMemo(() => options.find(e => e.value === doctorValue), [doctorValue, options]);

    const doctorSelectOption = defaultDoctor
        ? ({ label: defaultDoctor.label, value: defaultDoctor.value, name: 'doctorId' })
        : undefined

    return (
        <CascadingSelect
            options={options}
            names={['doctorId']}
            labels={['Medico']}
            placeholders={["Escoge un medico"]}
            defaultValues={[doctorSelectOption].filter(e => e !== undefined) as CascadingSelectValue[]}
            searchable
            {...props}
        />
    )
}

export default DoctorSelect