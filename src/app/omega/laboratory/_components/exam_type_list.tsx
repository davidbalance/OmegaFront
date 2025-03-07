import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import ExamTypeItem from './exam_type_item'
import { ExamType } from '@/server/exam_type/server_types'

interface ExamTypeListProps {
    active?: string;
    types: ExamType[];
}

const ExamTypeList: React.FC<ExamTypeListProps> = ({
    active,
    types
}) => {
    return (
        <ListTbody>
            {types.map(e => <ExamTypeItem key={e.typeId} active={active === e.typeId} {...e} />)}
        </ListTbody>)
}

export default ExamTypeList