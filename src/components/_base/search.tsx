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
    const lastUrlRef = useRef<string>(`${pathname}?${searchParams.toString()}`);
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
        const actualQuery = `${pathname}?${newQuery.toString()}`;

        if (actualQuery === lastUrlRef.current) return;

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
            key={value || 'default'}
            w='100%'
            defaultValue={value}
            placeholder='Buscar'
            onChange={handleSearchInput}
            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
        />
    )
}

export default Search;

/* 
"use client"

import { ActionIcon, Button, TextInput, rem } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

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
    const lastUrlRef = useRef<string>(`${pathname}?${searchParams.toString()}`);
    const prevSearchRef = useRef<string>("");

    useEffect(() => setText(value), [value]);

    const form = useForm();

    // useEffect(() => {

    //     if (debouncedSearch === prevSearchRef.current) return;

    //     prevSearchRef.current = debouncedSearch;

    //     const newQuery = new URLSearchParams(searchParams.toString());

    //     if (debouncedSearch) {
    //         newQuery.set(query, debouncedSearch);
    //     } else {
    //         newQuery.delete(query);
    //     }
    //     const actualQuery = `${pathname}?${newQuery.toString()}`;

    //     if (actualQuery === lastUrlRef.current) return;

    //     removeQueries.forEach(key => newQuery.delete(key));

    //     const newUrl = `${pathname}?${newQuery.toString()}`;
    //     if (newUrl !== lastUrlRef.current) {
    //         lastUrlRef.current = newUrl
    //         router.replace(newUrl);
    //     }
    // }, [debouncedSearch, pathname, query, router, searchParams, removeQueries]); 

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleSearch = useCallback(() => {

        if (text === prevSearchRef.current) return;

        prevSearchRef.current = text;

        const newQuery = new URLSearchParams(searchParams.toString());

        if (text) {
            newQuery.set(query, text);
        } else {
            newQuery.delete(query);
        }
        const actualQuery = `${pathname}?${newQuery.toString()}`;

        if (actualQuery === lastUrlRef.current) return;

        removeQueries.forEach(key => newQuery.delete(key));

        const newUrl = `${pathname}?${newQuery.toString()}`;
        if (newUrl !== lastUrlRef.current) {
            lastUrlRef.current = newUrl
            router.replace(newUrl);
        }
    }, [text, pathname, query, router, searchParams, removeQueries]);

    return (
        <form
            onSubmit={form.onSubmit(handleSearch)}
            style={{ width: '100%' }}>
            <TextInput
                w='100%'
                value={text}
                placeholder='Buscar'
                onChange={handleSearchInput}
                // leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                leftSection={
                    <ActionIcon
                        type='submit'
                        variant='transparent'>
                        <IconSearch style={{ width: rem(12), height: rem(12) }} stroke={2} />
                    </ActionIcon>
                }
            />
        </form>
    )
}

export default Search


*/