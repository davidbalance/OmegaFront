import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateCompanyForm from './_components/create-company-form'

type CompanyCreatePageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const CompanyCreatePage: React.FC<CompanyCreatePageProps> = ({
    searchParams
}) => {

    const corporativeId = typeof searchParams.corporativeId === 'string' ? searchParams.corporativeId : undefined;

    if (!corporativeId) return <>No se ha seleccionado un grupo corporativo</>

    return (
        <>
            <ReturnableHeader title='Creacion de empresa' />
            <CreateCompanyForm corporativeId={corporativeId} />
        </>
    )
}

export default CompanyCreatePage