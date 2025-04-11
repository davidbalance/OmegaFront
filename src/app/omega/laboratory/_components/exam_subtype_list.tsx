import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { ExamSubtype } from '@/server/exam-subtype/server-types'
import ExamSubtypeItem from './exam_subtype_item';

type ExamSubtypeListProps = {
    active?: string;
    typeId?: string;
    removeQueries?: string[];
    subtypes: ExamSubtype[];
}
const ExamSubtypeList: React.FC<ExamSubtypeListProps> = ({
    active,
    typeId,
    subtypes,
    removeQueries
}) => {

    return (
        <ListTbody>
            {subtypes.map(e => typeId && <ExamSubtypeItem
                key={e.subtypeId}
                typeId={typeId}
                active={active === e.subtypeId}
                removeQueries={removeQueries}
                {...e} />)}
        </ListTbody>
    )
}

export default ExamSubtypeList