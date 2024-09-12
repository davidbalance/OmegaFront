import { JobPosition } from '@/lib/dtos/location/job/position/base.response.dto'
import { TableTbody, TableTd, TableTr } from '@mantine/core';
import React from 'react'

interface JobPositionBodyProps {
    positions: JobPosition[];
}
const JobPositionBody: React.FC<JobPositionBodyProps> = ({
    positions
}) => {
    return (
        <TableTbody>
            {positions.map(e => (
                <TableTr key={e.id}>
                    <TableTd>{e.name}</TableTd>
                </TableTr>
            ))}
        </TableTbody>
    )
}

export default JobPositionBody