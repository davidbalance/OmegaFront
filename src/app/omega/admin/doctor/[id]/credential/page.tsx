import { retriveUser } from '@/server';
import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import CredentialAssignForm from './_components/credential-assign-form';

interface DoctorActionCredentialPageProps {
    params: { id: string }
}
const DoctorActionCredentialPage: React.FC<DoctorActionCredentialPageProps> = async ({ params }) => {

    const user = await retriveUser(params.id);

    return (
        <>
            <ReturnableHeader title='Asignar credenciales' />
            <CredentialAssignForm email={user.userEmail} {...user} />
        </>
    )
}

export default DoctorActionCredentialPage