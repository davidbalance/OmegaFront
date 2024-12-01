'use client'

import React, { } from 'react'
import { Box, rem, ScrollArea, Stack } from '@mantine/core';
import { useMedicalOrderLaboratory } from '../_context/medical-order-laboratory.context';
import MedicalOrderLaboratoryItem from './medical-order-laboratory-item';

const MedicalOrderLaboratoryList: React.FC = () => {
    const { exams } = useMedicalOrderLaboratory();

    return (
        <Box
            w='100%'
            h='100%'
            pos='relative'>
            <ScrollArea
                scrollbars='y'
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Stack gap={rem(16)}>
                    {exams.map((e, index) => (
                        <MedicalOrderLaboratoryItem key={Math.random()} index={index} {...e} />
                    ))}
                </Stack>
            </ScrollArea>
        </Box>
    )
}

export default MedicalOrderLaboratoryList