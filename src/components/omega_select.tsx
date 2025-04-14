import { ComboboxItem, rem, Select } from '@mantine/core';
import React from 'react'

type OmegaSelectProps = Omit<React.ComponentPropsWithRef<typeof Select>, 'onChange'> & {
    onChange: (option: ComboboxItem) => void;
};
const OmegaSelect: React.FC<OmegaSelectProps> = ({
    onChange, ...props
}) => {
    return (
        <Select
            checkIconPosition="left"
            pb={rem(16)}
            searchable
            defaultDropdownOpened={false}
            allowDeselect={false}
            maxDropdownHeight={200}
            onChange={(_, value) => onChange(value)}
            {...props}
        />
    )
}

export default OmegaSelect;