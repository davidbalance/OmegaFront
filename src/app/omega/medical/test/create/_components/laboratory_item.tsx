import React from 'react'
import { Group, rem, Stack, Text } from '@mantine/core';
import { MedicalTest } from '@/server/medical_test/server_types';

type LaboratoryItemProps = MedicalTest;
const LaboratoryItem: React.FC<LaboratoryItemProps> = ({
    examName,
    examSubtype,
    examType
}) => {

    return (
        <Stack
            py={rem(16)}
            gap={rem(4)}>
            <Text fw='bold' size='lg' ta='center'>{examName}</Text>
            <Group justify='center'>
                <Text size='xs' component='span'>
                    <Text fw='bold' component='span'>Tipo: </Text>
                    {examType}
                </Text>
                <Text size='xs' component='span'>
                    <Text fw='bold' component='span'>Subtipo: </Text>
                    {examSubtype}
                </Text>
            </Group>
        </Stack>
    );
}

export default LaboratoryItem