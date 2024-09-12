import { retriveUser } from '@/server/user.actions';
import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import CredentialAssignForm from './_components/credential-assign-form';

export const dynamic = 'force-dynamic'
interface DoctorActionCredentialPageProps {
    params: { id: number }
}
const DoctorActionCredentialPage: React.FC<DoctorActionCredentialPageProps> = async ({ params }) => {

    const user = await retriveUser(params.id);

    return (
        <>
            <ReturnableHeader title='Asignar credenciales' />
            <CredentialAssignForm {...user} />
        </>
    )
}

export default DoctorActionCredentialPage