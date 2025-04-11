import { JobPosition } from '@/server/job-position/server-types';
import { TableTd, TableTr } from '@mantine/core';
import React from 'react'

type JobPositionItemProps = JobPosition;
const JobPositionItem: React.FC<JobPositionItemProps> = ({
    jobPositionId,
    jobPositionName
}) => {
    return (
        <TableTr key={jobPositionId}>
            <TableTd>{jobPositionName}</TableTd>
        </TableTr>
    )
}

export default JobPositionItem