import { retriveCorporativeGroupOptions } from '@/server/corporative-group.actions';
import { retriveMedicalDiseaseYear } from '@/server/medical-disease.actions'
import React from 'react'
import DiseaseReportForm from './_components/disease-report-form';
import LocationInputSelect from './_components/location-input-select';
import YearInputSelect from './_components/year-input-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Box, rem, ScrollArea, Select, TextInput, Title } from '@mantine/core';
import FileTreeDownloaderForm from '@/app/omega/misc/_components/file-tree-downloader-form';
import { IconId } from '@tabler/icons-react';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { retriveMedicalOrderProcesses } from '@/server/medical-order.actions';

export const dynamic = 'force-dynamic'
const OmegaReportDiseasePage: React.FC = async () => {

  const yearOptions = await retriveMedicalDiseaseYear();
  const corporativeGroupOptions = await retriveCorporativeGroupOptions();
  const processes = await retriveMedicalOrderProcesses();

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
          <Box style={{ marginTop: rem(2) }} />
          <ModularBox>
            <Box style={{ flexShrink: 0 }}>
              <Title order={4} component='span'>Descarga arbol de archivos</Title>
            </Box>
          </ModularBox>
          <FileTreeDownloaderForm>
            <YearInputSelect
              options={yearOptions} />
            <LocationInputSelect
              options={corporativeGroupOptions}
              showCompany
              showBranch />
            <Select
              data={processes}
              checkIconPosition="left"
              searchable
              clearable
              defaultDropdownOpened={false}
              maxDropdownHeight={200}
              name='process'
              label="Proceso"
              placeholder="Escoge un proceso"
              nothingFoundMessage="Proceso no encontrado..." />
            <TextInput
              w='100%'
              name='dni'
              size='sm'
              type='text'
              label='Paciente'
              placeholder='175******'
              leftSection={
                <IconId style={{ width: rem(16), height: rem(16) }} />
              } />
          </FileTreeDownloaderForm>
        </ModularLayout>
      </ScrollArea>
    </Box>
  )
}

export default OmegaReportDiseasePage