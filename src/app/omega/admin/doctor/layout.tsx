import React from 'react'

interface DoctorLayoutProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}
const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children, modal }) => {
    return (
        <>
            {children}
            {modal}
        </>
    )
}

export default DoctorLayout