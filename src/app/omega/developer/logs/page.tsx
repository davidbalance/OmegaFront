import { ModularBox } from '@/components/modular/box/ModularBox';
import { countLog, retriveLogLevels, searchLog } from '@/server/logger.action';
import { Group, Stack } from '@mantine/core';
import React from 'react'
import LogLevel from './_components/log-level';
import LogDate from './_components/log-date';
import ServerPagination from '@/components/_base/server-pagination';
import LogBody from './_components/log-body';
import DeveloperLog from '@/components/developer/logs/developer-log';
import dayjs from 'dayjs';
import ReloadButton from '@/components/_base/reload-button';

const take = 100;
interface OmegaDeveloperLogsPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaDeveloperLogsPage: React.FC<OmegaDeveloperLogsPageProps> = async ({
    searchParams
}) => {

    const level = typeof searchParams.logLevel === 'string' ? searchParams.logLevel : undefined;
    const fromDate = typeof searchParams.fromDate === 'string' ? Number(searchParams.fromDate) : dayjs().subtract(1, 'day').toDate().getTime();
    const toDate = typeof searchParams.toDate === 'string' ? Number(searchParams.toDate) : dayjs().toDate().getTime();

    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const levels = await retriveLogLevels();

    const logs = await searchLog({ page: page - 1, take: take, fromDate, level, toDate });
    const logPages = await countLog({ take: take, fromDate, level, toDate });

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
                <ModularBox>
                    <LogDate />
                </ModularBox>
            </Group>
            <ModularBox flex={1}>
                <LogBody>{
                    logs.map(e => <DeveloperLog key={Math.random()} {...e} />)
                }</LogBody>
            </ModularBox>
            {logPages > 1 && (
                <ModularBox>
                    <ServerPagination
                        page={page}
                        total={logPages} />
                </ModularBox>)}
        </>
    )
}

export default OmegaDeveloperLogsPage