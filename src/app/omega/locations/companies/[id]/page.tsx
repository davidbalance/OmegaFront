'use client'

import React, { useEffect, useLayoutEffect, useState } from "react"
import { CompanyLayout } from "@/components/company/company-layout/CompanyLayout"
import { useCompany } from "@/hooks"
import { CompanyService } from "@/services/api";
import { Company as CompanyType} from "@/services/api/company/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { SelectorOption } from "@/lib";


const companyService = new CompanyService(endpoints.COMPANY.V1);

enum LayoutStates {
    DEFAULT
}

type CompanyProps = { params: { id: string } };


const Company: React.FC<CompanyProps> = ({params}) => {

    const companyHook = useCompany();

    const [companies, setCompanies] = useState<CompanyType[] | undefined>([]);
    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const load = async () => {
        try {
            const companies = await companyService.find( params.id );
            setCompanies(companies);
            setOptions(options);
        } catch (error) {
        } 
    }

    const handleClose = (group: string) => {
        companyHook.clearSelected();
        companyHook.find(group);
        setCurrentState(LayoutStates.DEFAULT);
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.DEFAULT]:
                <CompanyLayout
                    load={companyHook.loading}
                    companies={companies!}
                />
    }

    return <>
        {
            view[currentState]
        }
    </>

}

export default Company