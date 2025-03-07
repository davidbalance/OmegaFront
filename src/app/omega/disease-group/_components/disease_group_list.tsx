import ListTbody from '@/components/_base/list/list-tbody';
import React from 'react'
import { DiseaseGroup } from '@/server/disease_group/server_types';
import DiseaseGroupItem from './disease_group_item';

interface DiseaseGroupListProps {
    active?: string;
    groups: DiseaseGroup[];
}
const DiseaseGroupList: React.FC<DiseaseGroupListProps> = ({
    active,
    groups
}) => {
    return (
        <ListTbody>
            {groups.map(e => <DiseaseGroupItem key={e.groupId} active={active === e.groupId} {...e} />)}
        </ListTbody>)
}

export default DiseaseGroupList