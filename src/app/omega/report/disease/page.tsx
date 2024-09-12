import { retriveCorporativeGroupOptions } from '@/server/corporative-group.actions';
import { retriveMedicalDiseaseYear } from '@/server/medical-disease.actions'
import React from 'react'
import DiseaseReportForm from './_components/disease-report-form';
import DiseaseLocationForm from './_components/disease-location-form';
import DiseaseYearSelect from './_components/disease-year-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Box, Title } from '@mantine/core';

export const dynamic = 'force-dynamic'
const OmegaReportDiseasePage: React.FC = async () => {

  const yearOptions = await retriveMedicalDiseaseYear();
  const corporativeGroupOptions = await retriveCorporativeGroupOptions();

  return (
    <>
      <ModularBox>
        <Box style={{ flexShrink: 0 }}>
          <Title order={4} component='span'>Reporte de morbilidades</Title>
        </Box>
      </ModularBox>
      <DiseaseReportForm>
        <DiseaseYearSelect options={yearOptions} />
        <DiseaseLocationForm options={corporativeGroupOptions} />
      </DiseaseReportForm>
    </>
  )
}

export default OmegaReportDiseasePage