import { retriveCorporativeGroupOptions } from '@/server/corporative-group.actions';
import { retriveMedicalDiseaseYear } from '@/server/medical-disease.actions'
import React from 'react'
import DiseaseReportForm from './_components/disease-report-form';
import LocationInputSelect from './_components/location-input-select';
import YearInputSelect from './_components/year-input-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Box, ScrollArea, Title } from '@mantine/core';
import ModularLayout from '@/components/modular/layout/ModularLayout';

const OmegaReportDiseasePage: React.FC = async () => {

  const yearOptions = await retriveMedicalDiseaseYear();
  const corporativeGroupOptions = await retriveCorporativeGroupOptions();

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ScrollArea style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ModularLayout>
          <ModularBox>
            <Box style={{ flexShrink: 0 }}>
              <Title order={4} component='span'>Reporte de morbilidades</Title>
            </Box>
          </ModularBox>
          <DiseaseReportForm>
            <YearInputSelect
              options={yearOptions} />
            <LocationInputSelect
              options={corporativeGroupOptions}
              showCompany />
          </DiseaseReportForm>
        </ModularLayout>
      </ScrollArea>
    </Box>
  )
}

export default OmegaReportDiseasePage