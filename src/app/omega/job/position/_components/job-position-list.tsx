import { JobPosition } from '@/server/job-position/server-types';
import { TableTbody } from '@mantine/core';
import React from 'react'
import JobPositionItem from './job-position-item';

interface JobPositionListProps {
    positions: JobPosition[];
}
const JobPositionList: React.FC<JobPositionListProps> = ({
    positions
}) => {
    return (
        <TableTbody>
            {positions.map(e => <JobPositionItem key={e.jobPositionId} {...e} />)}
        </TableTbody>
    )
}

export default JobPositionList