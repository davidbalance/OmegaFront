import React from 'react'

interface OmegaAdminOrderLayoutProps {
    children: React.ReactNode,
    modal: React.ReactNode,
}
const OmegaAdminOrderLayout: React.FC<OmegaAdminOrderLayoutProps> = ({
    children,
    modal
}) => {
    return (
        <>
            {children}
            {modal}
        </>
    )
}

export default OmegaAdminOrderLayout