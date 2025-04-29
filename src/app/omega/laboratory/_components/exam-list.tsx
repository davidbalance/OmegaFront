import ListTbody from '@/components/_base/list/list-tbody';
import { Exam } from '@/server/exam/server-types';
import React from 'react'
import ExamItem from './exam-item';

interface ExamListProps {
    typeId?: string;
    subtypeId?: string;
    exams: Exam[];
}
const ExamList: React.FC<ExamListProps> = ({
    typeId,
    subtypeId,
    exams
}) => {
    return (
        <ListTbody>
            {exams.map(e => typeId && subtypeId && <ExamItem
                key={e.examId}
                typeId={typeId}
                subtypeId={subtypeId}
                {...e} />)}
        </ListTbody>
    )
}

export default ExamList