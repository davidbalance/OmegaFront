import React from 'react'

interface PatientLayoutProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}
const PatientLayout: React.FC<PatientLayoutProps> = ({ children, modal }) => {
    return (
        <>
            {children}
            {modal}
        </>
    )
}

export default PatientLayout