import ListTbody from '@/components/_base/list/list-tbody';
import { Company } from '@/server/company/server-types';
import React from 'react'
import CompanyItem from './company-item';

interface CompanyListProps {
    active?: string;
    companies: Company[];
    removeQueries?: string[];
}
const CompanyList: React.FC<CompanyListProps> = ({
    active,
    companies,
    removeQueries
}) => {
    return (
        <ListTbody>
            {companies.map(e => <CompanyItem
                key={e.companyId}
                active={active === e.companyId}
                removeQueries={removeQueries}
                {...e} />)}
        </ListTbody>
    )
}

export default CompanyList