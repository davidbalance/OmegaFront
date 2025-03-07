import ListTbody from '@/components/_base/list/list-tbody';
import { Company } from '@/server/company/server_types';
import React from 'react'
import CompanyItem from './company_item';

interface CompanyListProps {
    active?: string;
    companies: Company[];
}
const CompanyList: React.FC<CompanyListProps> = ({
    active,
    companies
}) => {
    return (
        <ListTbody>
            {companies.map(e => <CompanyItem key={e.companyId} active={active === e.companyId} {...e} />)}
        </ListTbody>
    )
}

export default CompanyList