import { ModularBox } from '@/components/modular/box/ModularBox'
import { useFetch } from '@/hooks/useFetch';
import { ServerLogLevel } from '@/lib/dtos/logs/log.response.dto';
import { ActionIcon, Divider, Flex, LoadingOverlay, rem, Tooltip, UnstyledButton } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classes from './DevloperLogButtons.module.css'
import { IconReload } from '@tabler/icons-react';

interface DevloperLogButtonsProps {
    /**
     * Funcion que es llamada cuando se realiza un click
     * @param value 
     * @returns 
     */
    onClick: (value: string | null) => void;
    /**
     * Funcion que se invoca cuando se llama al evento de recarga
     * @returns 
     */
    onReload: () => void;
}
const DevloperLogButtons: React.FC<DevloperLogButtonsProps> = ({ onClick, onReload }) => {

    const {
        data: levelData,
        error: levelError,
        loading: levelLoading
    } = useFetch<ServerLogLevel[]>('/api/logs/level', 'GET');

    const [value, setValue] = useState<string | null>(null);

    const handleClickAll = useCallback(() => {
        onClick(null);
        setValue(null);
    }, [onClick]);

    const handleClick = useCallback((level: string) => {
        setValue(level);
        onClick(level);
    }, [onClick]);

    const handleClickEventReload = useCallback(() => {
        onReload();
    }, [onReload]);

    const control = useMemo(() => levelData?.map((e) => (
        <UnstyledButton
            data-active={value == e.level || undefined}
            className={classes.control}
            key={e.level}
            onClick={() => handleClick(e.level)}>
            {e.level}
        </UnstyledButton>
    )), [levelData, value, handleClick]);

    useEffect(() => {
        if (levelError) notifications.show({ message: levelError.message, color: 'red' });
    }, [levelError]);

    return (
        <ModularBox
            direction='row'
            pos='relative'
            align='center'>
            <LoadingOverlay
                visible={levelLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ size: 'xs' }} />
            <UnstyledButton
                data-active={!value || undefined}
                className={classes.control}
                onClick={handleClickAll}>
                All
            </UnstyledButton>
            <Divider size="sm" orientation="vertical" />
            <Flex flex={1}>
                {control}
            </Flex>
            <Divider size="sm" orientation="vertical" />
            <Tooltip
                label='Recargar'>
                <ActionIcon
                    onClick={handleClickEventReload}
                    variant='light'
                    p={rem(4)} >
                    <IconReload />
                </ActionIcon>
            </Tooltip>
        </ModularBox>
    )
}

export default DevloperLogButtons