'use client'

import { Box, TextInput, rem, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconKey, IconDeviceFloppy } from '@tabler/icons-react'
import Joi from 'joi'
import { joiResolver } from 'mantine-form-joi-resolver'
import React, { FormEvent, useState } from 'react'

const formSchema = Joi.object({
    name: Joi
        .string()
        .required()
        .messages({
            'string.empty': 'Especifique el nombre del api key'
        })
});

interface ApikeyFormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref'> { }
const ApikeyForm: React.FC<ApikeyFormProps> = React.forwardRef<HTMLFormElement, ApikeyFormProps>(({
    onSubmit,
    ...props
}, ref) => {

    const form = useForm({
        initialValues: {
            name: '',
        },
        validate: joiResolver(formSchema)
    })

    const handleSubmit = (_: any, event: FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            onSubmit?.(event);
            form.reset();
        }
    }

    return (
        <>
            <Box
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                {...props}>
                <TextInput
                    name='name'
                    label='Ingrese nombre del api key'
                    placeholder='Mi api key'
                    leftSectionPointerEvents='none'
                    leftSection={(<IconKey style={{ width: rem(16), height: rem(16) }} />)}
                    rightSection={(
                        <ActionIcon
                            type='submit'
                            variant="subtle">
                            <IconDeviceFloppy style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    )}
                    {...form.getInputProps('name')} />
            </Box>
        </>
    )
});

export default ApikeyForm