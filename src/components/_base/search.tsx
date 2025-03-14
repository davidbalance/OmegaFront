"use client"

import { TextInput, rem } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface SearchProps {
    query?: string;
    value?: string;
    removeQueries?: string[];
}

const Search: React.FC<SearchProps> = ({
    query = 'search',
    value = '',
    removeQueries = []
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [text, setText] = useState<string>(value);
    const [debouncedSearch] = useDebouncedValue(text, 500);
    const lastUrlRef = useRef<string>("");
    const prevSearchRef = useRef<string>("");

    useEffect(() => setText(value), [value]);

    useEffect(() => {

        if (debouncedSearch === prevSearchRef.current) return;

        prevSearchRef.current = debouncedSearch;

        const newQuery = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            newQuery.set(query, debouncedSearch);
        } else {
            newQuery.delete(query);
        }

        removeQueries.forEach(key => newQuery.delete(key));

        const newUrl = `${pathname}?${newQuery.toString()}`;
        if (newUrl !== lastUrlRef.current) {
            lastUrlRef.current = newUrl
            router.replace(newUrl);
        }
    }, [debouncedSearch, pathname, query, router, searchParams, removeQueries]);

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