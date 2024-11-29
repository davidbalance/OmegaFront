'use client'

import React, { } from 'react'
import { SimpleGrid } from '@mantine/core';
import MedicalOrderLaboratoryProvider, { LaboratoryValue } from '../_context/medical-order-laboratory.context';
import MedicalOrderLaboratoryTrigger from './medical-order-laboratory-trigger';

type MedicalOrderLaboratoryRootProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> & {
    children: React.ReactNode;
    data?: {
        exams: LaboratoryValue[]
    },
    onSubmit?: (data: { exams: LaboratoryValue[] }) => void;
};
const MedicalOrderLaboratoryRoot = React.forwardRef<HTMLFormElement, MedicalOrderLaboratoryRootProps>(({
    data,
    children,
    onSubmit,
    ...props
}, ref) => {

    return (
        <MedicalOrderLaboratoryProvider initial={data?.exams}>
            <SimpleGrid cols={{ base: 1, md: 2 }} h='100%'>
                <MedicalOrderLaboratoryTrigger
                    ref={ref}
                    onSubmit={onSubmit}
                    {...props} />
                {children}
            </SimpleGrid>
        </MedicalOrderLaboratoryProvider>
    )
})

MedicalOrderLaboratoryRoot.displayName = 'MedicalOrderLaboratoryRoot'

export default MedicalOrderLaboratoryRoot