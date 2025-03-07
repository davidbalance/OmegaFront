"use client"

import { TextInput, rem } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'

interface SearchProps {
    query?: string;
    value?: string;
}

const Search: React.FC<SearchProps> = ({
    query = 'search',
    value,
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [text, setText] = useState<string>(value || '');
    const [debouncedSearch] = useDebouncedValue(text, 500);

    useEffect(() => {
        const newQuery = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            newQuery.set(query, debouncedSearch);
        } else {
            newQuery.delete(query);
        }

        const newUrl = `${pathname}?${newQuery.toString()}`;
        if (newUrl !== window.location.href) {
            router.push(newUrl);
        }
    }, [debouncedSearch, pathname, query, router, searchParams]);

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    return (
        <TextInput
            w='100%'
            value={text}
            placeholder='Buscar'
            onChange={handleSearchInput}
            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
        />
    )
}

export default Search