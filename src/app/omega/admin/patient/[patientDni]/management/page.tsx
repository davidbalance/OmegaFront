import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ManagementForm from './_components/management-form'
import { retriveClientManagement } from '@/server/medical_client/actions'
import { ModularBox } from '@/components/modular/box/ModularBox'
import Title from '@/components/_base/mantine/title'
import { retriveManagementOptions } from '@/server/management/actions'

interface ManagementFormPageProps {
  params: {
    patientDni: string
  }
}
const ManagementFormPage: React.FC<ManagementFormPageProps> = async ({
  params
}) => {
  const options = await retriveManagementOptions();
  const value = await retriveClientManagement(params.patientDni);

  return (
    <>
      <ReturnableHeader title='Asignar gerencia' />
      {options.length ? <ManagementForm
        patientDni={params.patientDni}
        options={options}
        managementValue={value.managementId} />
        : <ModularBox>
          <Title order={5}>No se han encontrado gerencias para asignar</Title>
        </ModularBox>}
    </>
  )
}

export default ManagementFormPage