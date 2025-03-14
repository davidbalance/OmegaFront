'use client'

import { useForm } from '@mantine/form';
import React, { useCallback } from 'react'

type PreviewReintegrateRecordProps = {
    data?: any;
    onSubmit?: (value: any) => void;
}
const PreviewReintegrateRecord = React.forwardRef<HTMLFormElement, PreviewReintegrateRecordProps>(({
    data,
    onSubmit
}, ref) => {

    console.log(data);

    const form = useForm();

    const handleSubmit = useCallback((value: any) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            PreviewReintegrateRecord
        </form>
    )
});

PreviewReintegrateRecord.displayName = 'PreviewReintegrateRecord';

export default PreviewReintegrateRecord