import React from 'react'
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Box, ScrollArea, Title } from '@mantine/core';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { retriveYears } from '@/server';
import { Option } from '@/lib/types/option.type';
import { retriveCorporativesOptions } from '@/server';
import DiseaseReportForm from './_components/disease-report-form';
import { CorporativeOption } from '@/server/corporative/server-types';

const OmegaReportDiseasePage: React.FC = async () => {

  const years = await retriveYears();
  const corporative = await retriveCorporativesOptions();

  const yearOptions: Option[] = years.map(e => ({ label: e.orderYear.toString(), value: e.orderYear.toString() }));
  const corporativeOptions = corporative.map(e => ({
    ...e,
    value: e.label,
    children: e.children.map(x => ({
      ...x,
      label: x.label.split('-')[1],
      value: x.label.split('-')[1]
    }))
  }) satisfies CorporativeOption)

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ScrollArea style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ModularLayout>
          <ModularBox>
            <Box style={{ flexShrink: 0 }}>
              <Title order={4} component='span'>Reporte de morbilidades</Title>
            </Box>
          </ModularBox>
          <DiseaseReportForm
            yearOptions={yearOptions}
            corporativeOptions={corporativeOptions} />
        </ModularLayout>
      </ScrollArea>
    </Box>
  )
}

export default OmegaReportDiseasePage