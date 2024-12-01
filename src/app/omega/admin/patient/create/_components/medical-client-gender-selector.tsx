import { Select, SelectProps } from '@mantine/core'
import React from 'react'

type MedicalClientGenderSelectorProps = Omit<SelectProps, 'data' | 'checkIconPosition' | 'label' | 'placeholder' | 'defaultDropdownOpened' | 'maxDropdownHeight'>;
const MedicalClientGenderSelector: React.FC<MedicalClientGenderSelectorProps> = ({ ...props }) => {
    return (
        <Select
            data={[{ value: 'male', label: 'Masculino' }, { value: 'female', label: 'Femenino' }]}
            checkIconPosition="left"
            label="Sexo"
            placeholder="Masculino"
            defaultDropdownOpened={false}
            maxDropdownHeight={200}
            {...props}
        />)
}

export default MedicalClientGenderSelector