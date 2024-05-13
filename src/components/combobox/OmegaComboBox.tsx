import { Combobox, Input, InputBase, InputBaseProps, useCombobox } from '@mantine/core';
import React, { useEffect, useState } from 'react'

type OmegaComboBoxProps = {
    options: string[];
    value?: number;
    placeholder?: string;
    emptyLabel?: string;
    notFoundLabel?: string;
    onChange?: (value: number) => void;
    inputProps?: InputBaseProps
};

const OmegaComboBox: React.FC<OmegaComboBoxProps> = ({
    options,
    value = null,
    placeholder = 'Escoge un valor',
    emptyLabel = 'Escoge un valor',
    notFoundLabel = 'No encontrado',
    onChange,
    inputProps
}) => {

    const [search, setSearch] = useState<string>('');
    const [index, setIndex] = useState<number | null>(value);

    useEffect(() => {
        setIndex(value);
        return () => { }
    }, [value])


    const combobox = useCombobox({
        onDropdownOpen: () => {
            combobox.resetSelectedOption();
            combobox.focusTarget();
            setSearch('');
        },
        onDropdownClose: () => {
            combobox.focusSearchInput();
        }
    });

    const selectorOption = options
        .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item, i) => (
            <Combobox.Option value={`${i}`} key={i}>
                {item}
            </Combobox.Option>
        ));

    return (
        <>
            <Combobox
                store={combobox}
                withinPortal={false}
                onOptionSubmit={(val) => {
                    const newIndex = parseInt(val);
                    setIndex(newIndex);
                    onChange?.(newIndex);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <InputBase
                        component="button"
                        type="button"
                        pointer
                        size='xs'
                        rightSection={<Combobox.Chevron />}
                        onClick={() => combobox.toggleDropdown()}
                        rightSectionPointerEvents="none"
                        {...inputProps}
                    >
                        {
                            (index !== null ? options[index] : undefined) || <Input.Placeholder>{emptyLabel}</Input.Placeholder>
                        }
                    </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Search
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        placeholder={placeholder}
                    />
                    <Combobox.Options>
                        {
                            selectorOption.length > 0
                                ? selectorOption
                                : <Combobox.Empty>{notFoundLabel}</Combobox.Empty>}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}

export default OmegaComboBox