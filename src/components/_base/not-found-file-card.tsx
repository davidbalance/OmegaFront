import { Card, CardSection, Text, Title } from '@mantine/core'
import React from 'react'

const NotFoundFileCard: React.FC = () => {
    return (
        <Card withBorder shadow="sm" radius="md">
            <CardSection withBorder inheritPadding py="xs">
                <Title order={4}>
                    <Text span inherit c='orange'>404</Text>{' '}Error</Title>

            </CardSection>

            <Text mt="sm" c="dimmed" size="sm">
                <Text span inherit c='orange'>
                    404 - Not found
                </Text>{' '}
                El archivo requerido no ha sido encontrado
            </Text>
        </Card>
    )
}

export default NotFoundFileCard