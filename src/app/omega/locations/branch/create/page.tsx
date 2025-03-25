import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateBranchForm from './_components/create-branch-form'

type CompanyBranchPageProps = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const CompanyBranchPage: React.FC<CompanyBranchPageProps> = async ({
    searchParams
}) => {

    const corporativeId = typeof searchParams.corporativeId === 'string' ? searchParams.corporativeId : undefined;
    const companyId = typeof searchParams.companyId === 'string' ? searchParams.companyId : undefined;

    if (!corporativeId) return <>No se ha seleccionado un grupo corporativo</>
    if (!companyId) return <>No se ha seleccionado una empresa</>

    return (
        <>
            <ReturnableHeader title='Creacion de sucursal' />
            <CreateBranchForm
                corporativeId={corporativeId}
                companyId={companyId} />
        </>
    )
}

export default CompanyBranchPage