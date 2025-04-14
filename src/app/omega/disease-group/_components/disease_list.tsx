import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import DiseaseItem from './disease_item'
import { Disease } from '@/server/disease/server-types';

interface DiseaseListProps {
    groupId?: string;
    diseases: Disease[]
}
const DiseaseList: React.FC<DiseaseListProps> = ({
    groupId,
    diseases
}) => {
    return (
        <ListTbody>
            {groupId && diseases.map(e => <DiseaseItem key={groupId} groupId={groupId} {...e} />)}
        </ListTbody>)
}

export default DiseaseList