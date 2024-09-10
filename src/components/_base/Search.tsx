"use client"

import { TextInput, rem } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface SearchProps {
    query?: string;
    value?: string;
}

const Search: React.FC<SearchProps> = ({
    query = 'search',
    value
}) => {

    const router = useRouter();
    const initialRender = useRef<boolean>(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [text, setText] = useState<string>(value || '');
    const [search] = useDebouncedValue(text, 500);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const newQuery = new URLSearchParams(searchParams.toString());
        if (!newQuery) {
            router.push(`${pathname}`);
        } else {
            if (search) {
                newQuery.set(query, search);
            } else {
                newQuery.delete(query);
            }
            router.push(`${pathname}?${newQuery.toString()}`);
        }
    }, [query, search, pathname, router, searchParams]);

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