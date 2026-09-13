'use client'

import { MenuItem, rem } from '@mantine/core'
import { IconCertificate } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { useActionMenu } from '@/contexts/action-menu.context'
import { createClientRecordCertificate, retriveClientRecordMetadata } from '@/server'
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record'
import { LOGO_NONE } from '@/server/record/create-record/base/author.schema'

const createCertificate = async (femoId: string): Promise<void> => {
    const femo = await retriveClientRecordMetadata(femoId);

    const certificate: CertificateRecordPayload = {
        patient: {
            firstName: femo.metadata.patient.firstName,
            middleName: femo.metadata.patient.middleName,
            lastName: femo.metadata.patient.lastName,
            secondLastName: femo.metadata.patient.secondLastName,
            gender: femo.metadata.patient.gender,
            jobPosition: femo.metadata.consultation.jobPosition,
        },
        author: {
            dni: femo.metadata.author.dni,
            fullname: femo.metadata.author.fullname
        },
        establishment: {
            healthFacility: femo.metadata.establishment.healthFacility,
            institutionName: femo.metadata.establishment.institutionName,
            ruc: femo.metadata.establishment.ruc,
            ciiu: femo.metadata.establishment.ciiu,
        },
        fitness: {
            type: femo.metadata.medicalAptitude.type,
            observation: ""
        },
        generalDataEvaluation: femo.metadata.consultation.evaluationType,
        recommendation: {
            observation: ""
        },
        logo: LOGO_NONE
    }

    return createClientRecordCertificate({ ...certificate, patientDni: femo.patientDni })
}

interface MenuActionCreateCertificateProps {
    recordId: string
}
const MenuActionCreateCertificate: React.FC<MenuActionCreateCertificateProps> = ({
    recordId,
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = createCertificate(recordId);
        trigger(promise);
    }, [recordId, trigger]);

    return (
        <MenuItem
            onClick={handleClick}
            leftSection={(
                <IconCertificate style={{ width: rem(16), height: rem(16) }} />
            )}>
            Generar Certificado
        </MenuItem>
    )
}

export default MenuActionCreateCertificate