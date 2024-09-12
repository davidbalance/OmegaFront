import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import ResourceForm from './_components/resource-form';

export const dynamic = 'force-dynamic'
const OmegaDeveloperNavigationCreatePage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de recursos' />
            <ResourceForm />
        </>
    );
}

export default OmegaDeveloperNavigationCreatePage