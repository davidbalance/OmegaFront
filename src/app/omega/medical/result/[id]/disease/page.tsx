import ReturnableHeader from '@/components/_base/returnable-header'
import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import DiseaseForm from './_components/disease-form'
import SelectProvider from './_context/select.context'
import { rem, SimpleGrid, Stack } from '@mantine/core'
import DiseaseClearButton from './_components/disease-clear-button'
import ListRoot from '@/components/_base/list/list-root'
import DiseaseListBody from './_components/disease-list-body'
import { retriveDiseaseOptions } from '@/server/disease-group.actions'
import { retriveMedicalDisease } from '@/server/medical-disease.actions'

interface MedicalResultDiseasePageProps {
  params: { id: number }
}
const MedicalResultDiseasePage: React.FC<MedicalResultDiseasePageProps> = async ({
  params
}) => {

  const options = await retriveDiseaseOptions();
  const values = await retriveMedicalDisease(params.id);

  return (
    <>
      <ReturnableHeader title='Administracion de morbilidades' />
      <SelectProvider>
        <SimpleGrid
          spacing={rem(8)}
          cols={{ base: 1, md: 2 }}
          h='100%'>
          <ModularBox flex={1}>
            <Stack>
              <DiseaseClearButton />
              <ListRoot>
                <DiseaseListBody data={values || []} />
              </ListRoot>
            </Stack>
          </ModularBox>
          <ModularBox flex={1}>
            <DiseaseForm
              id={params.id}
              options={options} />
          </ModularBox>
        </SimpleGrid>
      </SelectProvider>
    </>
  )
}

export default MedicalResultDiseasePage