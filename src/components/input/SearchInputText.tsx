import { TextInput, TextInputProps, rem } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react';
import React from 'react'

type SearchInputTextProps = TextInputProps;

const SearchInputText: React.FC<SearchInputTextProps> = ({ ...props }) => {
    return (
        <TextInput
            size="xs"
            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
            rightSectionWidth={70}
            styles={{ section: { pointerEvents: 'none' } }}
            mb="sm"
            {...props}
        />
    )
}

export { SearchInputText }