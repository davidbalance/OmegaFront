import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import ExamTypeItem from './exam-type-item'
import { ExamType } from '@/server/exam-type/server-types'

interface ExamTypeListProps {
    active?: string;
    types: ExamType[];
    removeQueries?: string[];
}

const ExamTypeList: React.FC<ExamTypeListProps> = ({
    active,
    types,
    removeQueries
}) => {
    return (
        <ListTbody>
            {types.map(e => <ExamTypeItem
                key={e.typeId}
                active={active === e.typeId}
                removeQueries={removeQueries}
                {...e} />)}
        </ListTbody>)
}

export default ExamTypeList