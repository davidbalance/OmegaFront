import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { ExamSubtype } from '@/server/exam_subtype/server_types'
import ExamSubtypeItem from './exam_subtype_item';

type ExamSubtypeListProps = {
    active?: string;
    typeId?: string;
    subtypes: ExamSubtype[];
}
const ExamSubtypeList: React.FC<ExamSubtypeListProps> = ({
    active,
    typeId,
    subtypes
}) => {

    return (
        <ListTbody>
            {subtypes.map(e => typeId && <ExamSubtypeItem key={e.subtypeId} typeId={typeId} active={active === e.subtypeId} {...e} />)}
        </ListTbody>
    )
}

export default ExamSubtypeList