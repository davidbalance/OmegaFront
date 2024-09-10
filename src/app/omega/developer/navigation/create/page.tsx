import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import ResourceForm from './_components/resource-form';

const OmegaDeveloperNavigationCreatePage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de recursos' />
            <ResourceForm />
        </>
    );
}

export default OmegaDeveloperNavigationCreatePage