import ListTbody from '@/components/_base/list/list-tbody';
import React from 'react'
import { DiseaseGroup } from '@/server/disease-group/server-types';
import DiseaseGroupItem from './disease-group-item';

interface DiseaseGroupListProps {
    active?: string;
    groups: DiseaseGroup[];
    removeQueries?: string[];
}
const DiseaseGroupList: React.FC<DiseaseGroupListProps> = ({
    active,
    groups,
    removeQueries
}) => {
    return (
        <ListTbody>
            {groups.map(e => <DiseaseGroupItem
                key={e.groupId}
                active={active === e.groupId}
                removeQueries={removeQueries}
                {...e} />)}
        </ListTbody>)
}

export default DiseaseGroupList