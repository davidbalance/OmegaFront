import React from 'react'
import { SimpleGrid } from '@mantine/core';

const LaboratoryRoot: React.FC<{ children: React.ReactNode }> = ({
    children,
}, ref) => {

    return (
        <SimpleGrid
            cols={{ base: 1, md: 2 }}
            h='100%'>
            {children}
        </SimpleGrid>
    )
}

export default LaboratoryRoot