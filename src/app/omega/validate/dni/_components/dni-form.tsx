'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Textarea } from '@mantine/core'
import React from 'react'
import { useDNIValidator } from '../_context/dni-validator.context'
import Joi from 'joi'

const DNIForm = () => {

    const { setData } = useDNIValidator();

    return (
        <ModularBox h='100%'>
            <Box component='form'>
                <Textarea
                    variant="unstyled"
                    placeholder="17XXXXXXXX"
                    autosize
                    minRows={20}
                    onChange={e => setData(e.currentTarget.value)} />
            </Box>
        </ModularBox>
    )
}

export default DNIForm