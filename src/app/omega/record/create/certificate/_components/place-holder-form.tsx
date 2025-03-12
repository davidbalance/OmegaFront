'use client'

import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'
import { z } from 'zod';

type PlaceholderFormProps = {
    data?: any;
    onSubmit?: (value: any) => void;
}
const PlaceholderForm = React.forwardRef<HTMLFormElement, PlaceholderFormProps>(({
    onSubmit
}, ref) => {

    const form = useForm();

    const handleSubmit = useCallback((value: any) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            PlaceholderForm
        </form>
    )
});

PlaceholderForm.displayName = 'PlaceholderForm';

export default PlaceholderForm