'use client'

import React, { } from 'react'
import { Box, rem, ScrollArea, Stack } from '@mantine/core';
import LaboratoryItem from './laboratory-item';
import { MedicalTest } from '@/server/medical-test/server-types';

type LaboratoryListProps = {
    tests: MedicalTest[];
}
const LaboratoryList: React.FC<LaboratoryListProps> = ({
    tests
}) => {

    return (
        <Box
            w='100%'
            h='100%'
            pos='relative'>
            <ScrollArea
                scrollbars='y'
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Stack gap={rem(8)}>
                    {tests.map((e) => (
                        <LaboratoryItem key={e.testId}  {...e} />
                    ))}
                </Stack>
            </ScrollArea>
        </Box>
    )
}

export default LaboratoryList