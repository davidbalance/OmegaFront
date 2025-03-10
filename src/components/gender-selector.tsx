import { Select, SelectProps } from '@mantine/core'
import React from 'react'

type GenderSelectorProps = React.ComponentProps<typeof Select>;
const GenderSelector: React.FC<GenderSelectorProps> = ({ ...props }) => {
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

export default GenderSelector