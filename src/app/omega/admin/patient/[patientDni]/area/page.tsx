import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import AreaForm from './_components/area_form'
import { retriveAreaOptions } from '@/server'
import { retriveClientArea } from '@/server'
import { ModularBox } from '@/components/modular/box/ModularBox'
import Title from '@/components/_base/mantine/title'

interface AreaFormPageProps {
  params: {
    patientDni: string
  }
}
const AreaFormPage: React.FC<AreaFormPageProps> = async ({
  params
}) => {
  const options = await retriveAreaOptions();
  const value = await retriveClientArea(params.patientDni);

  return (
    <>
      <ReturnableHeader title='Asignar area' />
      {options.length ? <AreaForm
        patientDni={params.patientDni}
        options={options}
        areaValue={value.areaId} />
        : <ModularBox>
          <Title order={5}>No se han encontrado areas para asignar</Title>
        </ModularBox>}
    </>
  )
}

export default AreaFormPage