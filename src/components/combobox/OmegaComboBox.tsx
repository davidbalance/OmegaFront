import { Combobox, ComboboxProps, TextInput, useCombobox } from '@mantine/core';
import React, { useState } from 'react'

type OmegaComboBoxProps = {
    options: string[];
    onChange?: (value: number) => void;
    label?: string;
};

const OmegaComboBox: React.FC<OmegaComboBoxProps> = ({ options, label, onChange }) => {

    const combobox = useCombobox();
    const [value, setValue] = useState<string>('');

    const shouldFilterOptions = !options.some((item) => item === value);
    const filteredOptions = shouldFilterOptions
        ? options.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
        : options;

    const comboOptions = filteredOptions.map((item, index) => (
        <Combobox.Option value={`${index}`} key={index}>
            {item}
        </Combobox.Option>
    ));

    return (
        <>
            <Combobox
                onOptionSubmit={(optionValue) => {
                    const index = parseInt(optionValue);
                    setValue(options[index]);
                    onChange?.(index);
                    combobox.closeDropdown();
                }}
                store={combobox}
            >
                <Combobox.Target>
                    <TextInput
                        label={label}
                        placeholder="Seleccione un valor"
                        value={value}
                        onChange={(event) => {
                            setValue(event.currentTarget.value);
                            combobox.openDropdown();
                            combobox.updateSelectedOptionIndex();
                        }}
                        onClick={() => combobox.openDropdown()}
                        onFocus={() => combobox.openDropdown()}
                        onBlur={() => combobox.closeDropdown()}
                    />
                </Combobox.Target>

                <Combobox.Dropdown mah={200} style={{ overflowY: 'auto' }}>
                    <Combobox.Options>
                        {comboOptions.length === 0 ? <Combobox.Empty>No existe</Combobox.Empty> : comboOptions}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}

export default OmegaComboBox