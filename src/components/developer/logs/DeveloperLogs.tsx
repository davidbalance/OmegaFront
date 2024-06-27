import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { useFetch } from '@/hooks/useFetch'
import { useList } from '@/hooks/useList';
import { POSTLogRequestDto } from '@/lib/dtos/logs/log.request.dto';
import { ServerLog } from '@/lib/dtos/logs/log.response.dto';
import { Flex, LoadingOverlay, ScrollArea, rem } from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DeveloperLog } from './DeveloperLog';
import classes from './DeveloperLogs.module.css';
import DevloperLogButtons from './DevloperLogButtons';
import { useMediaQuery } from '@mantine/hooks';

const DeveloperLogs: React.FC = () => {

    const [searchRequest, setSearchRequest] = useState<POSTLogRequestDto | null>(null);
    const [shouldRequest, setShouldRequest] = useState<boolean>(false);

    const isMobile = useMediaQuery('(max-width: 50em)');

    const {
        data: logData,
        error: logError,
        loading: logLoading,
        reload: logReload,
        request: logRequest,
        reset: logReset
    } = useFetch<ServerLog[]>('/api/logs', 'POST', { body: {} });

    const [logDataArray, {
        override: logOverride
    }] = useList<ServerLog>([]);

    const handleClickEventLogLevel = useCallback((value: string | null) => {
        setSearchRequest(prev => {
            const newState = { ...prev, level: value ? value : undefined };
            logRequest(newState);
            setShouldRequest(true);
            return newState;
        });
    }, [logRequest]);

    const handleDatePickerChangeEvent = useCallback((value: DatesRangeValue) => {
        setSearchRequest(prev => {
            const newState = {
                ...prev,
                from: value[0] ? value[0] : undefined,
                to: value[1] ? value[1] : undefined,
            }
            logRequest(newState);
            setShouldRequest(true);
            return newState;
        });
    }, [logRequest]);

    const logItems = useMemo(() => logDataArray.map((e, index) => <DeveloperLog key={index} log={e} />), [logDataArray])

    useEffect(() => {
        if (logError) notifications.show({ message: logError.message, color: 'red' });
    }, [logError]);

    useEffect(() => {
        if (logData) {
            logOverride(logData);
            logReset();
        }
    }, [logData, logOverride, logReset]);

    useEffect(() => {
        if (shouldRequest) {
            logReload();
            setShouldRequest(false);
        }
    }, [shouldRequest, logReload])

    return (
        <ModularLayout>
            <ModularLayout direction={isMobile ? 'column' : 'row'} h='auto'>
                <DevloperLogButtons onClick={handleClickEventLogLevel} />

                <ModularBox>
                    <DatePickerInput
                        w='100%'
                        size='xs'
                        type="range"
                        label='Rango de fechas'
                        placeholder="Selecciona un rango de fecha"
                        onChange={handleDatePickerChangeEvent}
                    />
                </ModularBox>
            </ModularLayout>

            <ModularBox
                h='100%'
                pos='relative'>
                <LoadingOverlay visible={logLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <ScrollArea
                    className={classes.container}
                    h={375}>
                    <Flex direction='column' gap={rem(8)}>
                        {logItems}
                    </Flex>
                </ScrollArea>
            </ModularBox>
        </ModularLayout>
    )
}

export { DeveloperLogs }