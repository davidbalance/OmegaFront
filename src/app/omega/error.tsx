'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { getErrorMessage } from '@/lib/utils/errors';
import { Box, Button, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import React, { useEffect } from 'react'

interface OmegaErrorProps {
    error: Error & { digest?: string }
    reset: () => void;
}
const OmegaError: React.FC<OmegaErrorProps> = ({
    error,
    reset
}) => {
    const theme = useMantineTheme();
    useEffect(() => {
        console.error(error)
    }, [error]);
    return (
        <>
            <ModularBox flex={1}>
                <Stack
                    justify='center'
                    align='center'
                    h='100%'>
                    <Text
                        fw='bolder'
                        component="span"
                        variant="gradient"
                        gradient={{ from: theme.colors["orange"][3], to: theme.colors["orange"][6] }}
                        inherit>
                        <Title component='span'>
                            Error
                        </Title>
                    </Text>
                    <Box>
                        <Text
                            c="dimmed"
                            size='md'
                            mt='md'
                            fw={500}>
                            Se ha producido el siguiente error
                        </Text>
                        <Box w={300}>
                            <Text
                                c="dimmed"
                                size='sm'
                                truncate="end">
                                <br />
                                <br />- {getErrorMessage(error)}
                                <br />- {error.stack}
                                {error.digest ? <><br />- {error.digest}</> : null}
                            </Text>
                        </Box>
                    </Box>
                </Stack>
            </ModularBox>
            <ModularBox>
                <Button
                    size='sm'
                    fullWidth
                    onClick={() => reset()}>
                    Reintentar
                </Button>
            </ModularBox>
        </>
    )
}

export default OmegaError