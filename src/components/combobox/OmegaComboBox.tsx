import { SelectorOption } from '@/lib';
import { Combobox, TextInput, useCombobox } from '@mantine/core';
import React, { useState } from 'react'

type OmegaComboBoxProps = {
    options: SelectorOption<any>[];
    onChange?: (value: SelectorOption<any>) => void;
    label?: string;
};

const OmegaComboBox: React.FC<OmegaComboBoxProps> = ({ options, label, onChange }) => {

    const combobox = useCombobox();
    const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined);
    const [value, setValue] = useState<SelectorOption<any> | undefined>(undefined);

    const shouldFilterOptions = !options.some((item) => item.label === value?.label);
    const filteredOptions = shouldFilterOptions
        ? options
            .filter((item) =>
                item
                    .label
                    .toLowerCase()
                    .includes(value?.label.toLowerCase().trim() || '')
            )
        : options;

    const comboOptions = filteredOptions.map((item, index) => (
        <Combobox.Option value={`${index}`} key={index}>
            {item.label}
        </Combobox.Option>
    ));

    return (
        <>
            <Combobox
                onOptionSubmit={(optionValue) => {
                    const index = parseInt(optionValue);
                    const value = options[index];
                    setValue(value);
                    onChange?.(value);
                    combobox.closeDropdown();
                }}
                store={combobox}
            >
                <Combobox.Target>
                    <TextInput
                        label={label}
                        placeholder="Seleccione un valor"
                        value={currentIndex}
                        onChange={(event) => {
                            const index = parseInt(event.currentTarget.value);
                            setCurrentIndex(index);
                            const value = options[index];
                            setValue(value);
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