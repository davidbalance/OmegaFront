import { TextInput, TextInputProps, rem } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react';
import React from 'react'

type InputSearchProps = TextInputProps;

const InputSearch: React.FC<InputSearchProps> = ({ ...props }) => {
    return (
        <TextInput
            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
            {...props}
        />
    )
}

export { InputSearch }