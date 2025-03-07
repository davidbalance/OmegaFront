import { ModularBox } from '@/components/modular/box/ModularBox';
import { Group, Stack } from '@mantine/core';
import React from 'react'
import LogLevel from './_components/log-level';
import ServerPagination from '@/components/_base/server-pagination';
import LogBody from './_components/log-body';
import DeveloperLog from '@/components/developer/logs/developer-log';
import ReloadButton from '@/components/_base/reload-button';
import { retriveLogger, retriveLoggerLevels } from '@/server/logger/actions';

const take = 100;
interface OmegaDeveloperLogsPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaDeveloperLogsPage: React.FC<OmegaDeveloperLogsPageProps> = async ({
    searchParams
}) => {

    const level = typeof searchParams.logLevel === 'string' ? searchParams.logLevel : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const levels = await retriveLoggerLevels();

    const loggerValue = await retriveLogger({
        level: level,
        skip: page - 1,
        limit: take,
    });
    const totalLoggerPage = Math.floor(loggerValue.amount / take);

    return (
        <>
            <Group wrap='nowrap'>
                <ModularBox w='fit-content' h='100%'>
                    <Stack justify='center' h='100%'>
                        <ReloadButton />
                    </Stack>
                </ModularBox>
                <ModularBox>
                    <LogLevel levels={levels} />
                </ModularBox>
            </Group>
            <ModularBox flex={1}>
                <LogBody>{
                    loggerValue.data.map(e => <DeveloperLog key={Math.random()} {...e} />)
                }</LogBody>
            </ModularBox>
            {totalLoggerPage > 1 && (
                <ModularBox>
                    <ServerPagination
                        page={page}
                        total={totalLoggerPage} />
                </ModularBox>)}
        </>
    )
}

export default OmegaDeveloperLogsPage