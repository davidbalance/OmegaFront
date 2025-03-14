import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Group, rem, Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react'
import ExamTypeHeader from './_components/exam_type_header';
import ExamSubtypeHeader from './_components/exam_subtype_header';
import ExamHeader from './_components/exam_header';
import Title from '@/components/_base/mantine/title';
import { retriveExamTypes } from '@/server/exam_type/actions';
import { PaginationResponse } from '@/lib/types/pagination.type';
import { ExamSubtype } from '@/server/exam_subtype/server_types';
import { retriveExamSubtypes } from '@/server/exam_subtype/actions';
import { Exam } from '@/server/exam/server_types';
import { retriveExams } from '@/server/exam/actions';
import ExamTypeList from './_components/exam_type_list';
import ExamSubtypeList from './_components/exam_subtype_list';
import ExamList from './_components/exam_list';
import CreateButton from '@/components/_base/create-button';

const take: number = 100;
interface OmegaLaboratoryPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaLaboratoryPage: React.FC<OmegaLaboratoryPageProps> = async ({
  searchParams
}) => {

  const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
  const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
  const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;


  const typeActive = typeof searchParams.type === 'string' ? searchParams.type : undefined;
  const typeSearch = typeof searchParams.typeSearch === 'string' ? searchParams.typeSearch : undefined;
  const typeField = owner === 'type' ? field : undefined;
  const typePage = typeof searchParams.typePage === 'string' ? Number(searchParams.typePage) : 1;

  const subtypeActive = typeof searchParams.subtype === 'string' ? searchParams.subtype : undefined;
  const subtypeSearch = typeof searchParams.subtypeSearch === 'string' ? searchParams.subtypeSearch : undefined;
  const subtypeField = owner === 'subtype' ? field : undefined;
  const subtypePage = typeof searchParams.subtypePage === 'string' ? Number(searchParams.subtypePage) : 1;

  const examSearch = typeof searchParams.examSearch === 'string' ? searchParams.examSearch : undefined;
  const examField = owner === 'exam' ? field : undefined;

  const typeValue = await retriveExamTypes({
    filter: typeSearch,
    orderField: typeField as any,
    orderValue: orderingValue as any,
    skip: typePage - 1,
    limit: take
  });
  const totalTypePage = Math.floor(typeValue.amount / take);

  const subtypeValue: PaginationResponse<ExamSubtype> = typeActive
    ? await retriveExamSubtypes({
      typeId: typeActive,
      filter: subtypeSearch,
      orderField: subtypeField as any,
      orderValue: orderingValue as any,
      skip: subtypePage - 1,
      limit: take,
    }) : { data: [], amount: 0 };
  const totalSubtypePage = Math.floor(subtypeValue.amount / take);

  const examValues: Exam[] = subtypeActive
    ? await retriveExams({
      subtypeId: subtypeActive,
      filter: examSearch,
      orderField: examField as any,
      orderValue: orderingValue as any
    }) : [];


  return (
    <MultipleLayerRoot>
      <MultipleLayerSection active={!typeActive && !subtypeActive}>
        <ModularLayout>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
              <Title order={4} component='span'>Tipos de examenes</Title>
              <ReloadButton />
            </Group>
          </ModularBox>
          <ModularBox>
            <Search
              query='typeSearch'
              value={typeSearch}
              removeQueries={['field', 'owner', 'order', 'type', 'typePage', 'subtype', 'subtypeSearch', 'subtypePage', 'examSearch']} />
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ExamTypeHeader />
              <ExamTypeList
                active={typeActive}
                types={typeValue.data}
                removeQueries={['subtype', 'subtypeSearch', 'subtypePage', 'examSearch']} />
            </ListRoot>
          </ModularBox>
          {totalTypePage > 1 && (
            <ModularBox>
              <ServerPagination
                queryKey='typePage'
                page={typePage}
                total={totalTypePage} />
            </ModularBox>)}
        </ModularLayout>
      </MultipleLayerSection>

      <MultipleLayerSection active={!!typeActive && !subtypeActive}>
        <ModularLayout>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
              <Title order={4} component='span'>Subtipos de examenes</Title>
              <Group gap={rem(4)}>
                {!!typeActive && <CreateButton href={`laboratory/subtype/${typeActive}/create`} />}
                <ReloadButton />
                <RemoveQueryButton
                  queries={['type']}
                  hiddenFrom='md' />
              </Group>
            </Group>
          </ModularBox>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
              <Search
                query='subtypeSearch'
                value={subtypeSearch}
                removeQueries={['field', 'owner', 'order', 'subtype', 'subtypePage', 'examSearch']} />
            </Group>
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ExamSubtypeHeader />
              <ExamSubtypeList
                active={subtypeActive}
                typeId={typeActive}
                subtypes={subtypeValue.data}
                removeQueries={['examSearch']} />
            </ListRoot>
          </ModularBox>
          {totalSubtypePage > 1 && (
            <ModularBox>
              <ServerPagination
                queryKey='subtypePage'
                page={subtypePage}
                total={totalSubtypePage} />
            </ModularBox>)}
        </ModularLayout>
      </MultipleLayerSection>

      <MultipleLayerSection active={!!typeActive && !!subtypeActive}>
        <ModularLayout>
          <ModularBox>
            <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
              <Title order={4} component='span'>Examenes</Title>
              <Group gap={rem(4)}>
                <ReloadButton />
                <RemoveQueryButton
                  queries={['subtype']}
                  hiddenFrom='md' />
              </Group>
            </Group>
          </ModularBox>
          <ModularBox>
            <Search
              query='examSearch'
              value={examSearch}
              removeQueries={['field', 'owner', 'order']} />
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ExamHeader />
              <ExamList
                typeId={typeActive}
                subtypeId={subtypeActive}
                exams={examValues} />
            </ListRoot>
          </ModularBox>
        </ModularLayout>
      </MultipleLayerSection>
    </MultipleLayerRoot>)
}

export default OmegaLaboratoryPage