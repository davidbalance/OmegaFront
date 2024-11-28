import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Group, rem, Box, Title, Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react'
import ExamTypeHeader from './_components/exam-type-header';
import ExamTypeBody from './_components/exam-type-body';
import { countExamType, searchExamType } from '@/server/exam-type.actions';
import { countExamSubtype, searchExamSubtype } from '@/server/exam-subtype.actions';
import { countExam, searchExam } from '@/server/exam.actions';
import ExamSubtypeHeader from './_components/exam-subtype-header';
import ExamSubtypeBody from './_components/exam-subtype-body';
import ExamHeader from './_components/exam-header';
import ExamBody from './_components/exam-body';

const take: number = 100;
interface OmegaLaboratoryPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaLaboratoryPage: React.FC<OmegaLaboratoryPageProps> = async ({
  searchParams
}) => {

  const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
  const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
  const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

  const type = typeof searchParams.type === 'string' ? Number(searchParams.type) : undefined;
  const subtype = typeof searchParams.subtype === 'string' ? Number(searchParams.subtype) : undefined;

  const typeSearch = typeof searchParams.typeSearch === 'string' ? searchParams.typeSearch : undefined;
  const typeField = owner === 'type' ? field : undefined;
  const typePage = typeof searchParams.typePage === 'string' ? Number(searchParams.typePage) : 1;

  const subtypeSearch = typeof searchParams.subtypeSearch === 'string' ? searchParams.subtypeSearch : undefined;
  const subtypeField = owner === 'subtype' ? field : undefined;
  const subtypePage = typeof searchParams.subtypePage === 'string' ? Number(searchParams.subtypePage) : 1;

  const examSearch = typeof searchParams.examSearch === 'string' ? searchParams.examSearch : undefined;
  const examField = owner === 'exam' ? field : undefined;
  const examPage = typeof searchParams.examPage === 'string' ? Number(searchParams.examPage) : 1;

  const types = await searchExamType({ search: typeSearch, field: typeField, page: typePage - 1, take: take, order: order as any });
  const typePages = await countExamType({ search: typeSearch, take: take });

  const subtypes = type
    ? await searchExamSubtype(type, { search: subtypeSearch, field: subtypeField, page: subtypePage - 1, take: take, order: order as any })
    : [];
  const subtypePages = type
    ? await countExamSubtype(type, { search: examSearch, take: take })
    : 0;

  const exams = subtype
    ? await searchExam(subtype, { search: examSearch, field: examField, page: examPage - 1, take: take, order: order as any })
    : [];
  const examPages = subtype
    ? await countExam(subtype, { search: examSearch, take: take })
    : 0;

  return (
    <MultipleLayerRoot>
      <MultipleLayerSection active={!type && !subtype}>
        <ModularLayout>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
              <Box style={{ flexShrink: 0 }}>
                <Title order={4} component='span'>Tipos de examenes</Title>
              </Box>
              <ReloadButton />
            </Group>
          </ModularBox>
          <ModularBox>
            <Search query='typeSearch' value={typeSearch} />
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ExamTypeHeader />
              <ExamTypeBody active={type} types={types} />
            </ListRoot>
          </ModularBox>
          {typePages > 1 && (
            <ModularBox>
              <ServerPagination
                queryKey='typePage'
                page={typePage}
                total={typePages} />
            </ModularBox>)}
        </ModularLayout>
      </MultipleLayerSection>
      <MultipleLayerSection active={!!type && !subtype}>
        <ModularLayout>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
              <Box style={{ flexShrink: 0 }}>
                <Title order={4} component='span'>Subtipos de examenes</Title>
              </Box>
              <Group gap={rem(4)}>
                <ReloadButton />
                <RemoveQueryButton
                  queries={['type']}
                  hiddenFrom='md' />
              </Group>
            </Group>
          </ModularBox>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
              <Search query='subtypeSearch' value={subtypeSearch} />
              {!!type && (
                <Button
                  component={Link}
                  href={`laboratory/type/${type}/subtype`}
                  radius='md'>
                  Crear subtipo
                </Button>)}
            </Group>
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ExamSubtypeHeader />
              <ExamSubtypeBody active={subtype} subtypes={subtypes} />
            </ListRoot>
          </ModularBox>
          {subtypePages > 1 && (
            <ModularBox>
              <ServerPagination
                queryKey='subtypePage'
                page={subtypePage}
                total={subtypePages} />
            </ModularBox>)}
        </ModularLayout>
      </MultipleLayerSection>
      <MultipleLayerSection active={!!type && !!subtype}>
        <ModularLayout>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
              <Box style={{ flexShrink: 0 }}>
                <Title order={4} component='span'>Examenes</Title>
              </Box>
              <Group gap={rem(4)}>
                <ReloadButton />
                <RemoveQueryButton
                  queries={['subtype']}
                  hiddenFrom='md' />
              </Group>
            </Group>
          </ModularBox>
          <ModularBox>
            <Search query='examSearch' value={examSearch} />
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ExamHeader />
              <ExamBody exams={exams} />
            </ListRoot>
          </ModularBox>
          {examPages > 1 && (
            <ModularBox>
              <ServerPagination
                queryKey='examPage'
                page={examPage}
                total={examPages} />
            </ModularBox>)}
        </ModularLayout>
      </MultipleLayerSection>
    </MultipleLayerRoot>)
}

export default OmegaLaboratoryPage