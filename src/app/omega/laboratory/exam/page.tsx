import ActionMenu from '@/components/_base/action-menu';
import AddQueryParam from '@/components/_base/add-query-param';
import Await from '@/components/_base/await';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import ListRow from '@/components/_base/list/list-row';
import ListTbody from '@/components/_base/list/list-tbody';
import ListTh from '@/components/_base/list/list-th';
import ListThead from '@/components/_base/list/list-thead';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import OrderableButton from '@/components/_base/orderable-button';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto';
import { ExamSingleSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto';
import { countExamSubtypes, searchExamSubtypes } from '@/server/exam-subtype.actions';
import { countExamTypes, searchExamTypes } from '@/server/exam-type.actions';
import { countExams, searchExams } from '@/server/exam.actions';
import { Group, rem, Box, Title, Stack, Text, Button, MenuItem, MenuLabel } from '@mantine/core';
import { IconExchange, IconPencil, IconTrash } from '@tabler/icons-react';
import { group } from 'console';
import Link from 'next/link';
import React, { Suspense } from 'react'
import ExamSubtypeActionDelete from './_components/exam-subtype-action-delete';

const take: number = 100;
interface OmegaLaboratoryExamPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaLaboratoryExamPage: React.FC<OmegaLaboratoryExamPageProps> = ({
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

  const typePromise = searchExamTypes({ search: typeSearch, field: typeField, page: typePage - 1, take: take, order: order as any });
  const typePagePromise = countExamTypes({ search: typeSearch, take: take });

  const subtypePromise = type
    ? searchExamSubtypes(type, { search: subtypeSearch, field: subtypeField, page: subtypePage - 1, take: take, order: order as any })
    : new Promise<ExamSingleSubtype[]>((resolve) => resolve([]));
  const subtypePagePromise = type
    ? countExamSubtypes(type, { search: examSearch, take: take })
    : new Promise<number>((resolve) => resolve(0));

  const examPromise = subtype
    ? searchExams(subtype, { search: examSearch, field: examField, page: examPage - 1, take: take, order: order as any })
    : new Promise<Exam[]>((resolve) => resolve([]));
  const examPagePromise = subtype
    ? countExams(subtype, { search: examSearch, take: take })
    : new Promise<number>((resolve) => resolve(0));

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
              <ListThead>
                <ListTh>
                  <OrderableButton
                    owner='type'
                    field='name'>
                    <Text>Tipo</Text>
                  </OrderableButton>
                </ListTh>
              </ListThead>
              <Suspense fallback={<ListBodySuspense />}>
                <Await promise={typePromise}>
                  {(types) => (
                    <ListTbody>
                      {types.map(e => (
                        <ListRow
                          active={type === e.id}
                          hoverable={true}
                          key={e.id}>
                          <Group justify='space-between' align='center' wrap='nowrap'>
                            <AddQueryParam
                              value={e.id.toString()}
                              query='type'
                              removeQueries={['subtype']}>
                              <Title order={6}>{e.name}</Title>
                            </AddQueryParam>
                          </Group>
                        </ListRow>
                      ))}
                    </ListTbody>
                  )}
                </Await>
              </Suspense>
            </ListRoot>
          </ModularBox>
          <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
            <Await promise={typePagePromise}>
              {(pages) => (
                <>{pages > 1 && (
                  <ModularBox>
                    <ServerPagination
                      queryKey='typePage'
                      page={typePage}
                      total={pages} />
                  </ModularBox>)}</>
              )}
            </Await>
          </Suspense>
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
                  queries={['subtype']}
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
                  href={`type/${type}/subtype`}
                  radius='md'>
                  Crear subtipo
                </Button>)}
            </Group>
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ListThead>
                <ListTh>
                  <OrderableButton
                    owner='subtype'
                    field='name'>
                    <Text>Subtipo</Text>
                  </OrderableButton>
                </ListTh>
              </ListThead>
              <Suspense fallback={<ListBodySuspense />}>
                <Await promise={subtypePromise}>
                  {(subtypes) => (
                    <ListTbody>
                      {subtypes.map(e => (
                        <ListRow
                          active={subtype === e.id}
                          hoverable={true}
                          key={e.id}>
                          <Group justify='space-between' gap={rem(8)} wrap='nowrap'>
                            <AddQueryParam
                              value={e.id.toString()}
                              query='subtype'>
                              <Title order={6}>{e.name}</Title>
                            </AddQueryParam>
                            <ActionMenuProvider>
                              <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                  component={Link}
                                  href={`subtype/${e.id}/update`}
                                  leftSection={(
                                    <IconPencil style={{ width: rem(16), height: rem(16) }} />
                                  )}>
                                  Modificacion
                                </MenuItem>
                                <MenuItem
                                  component={Link}
                                  href={`subtype/${e.id}/change`}
                                  leftSection={(
                                    <IconExchange style={{ width: rem(16), height: rem(16) }} />
                                  )}>
                                  Cambiar tipo de examen
                                </MenuItem>
                                <ExamSubtypeActionDelete id={e.id} />
                              </ActionMenu>
                            </ActionMenuProvider>
                          </Group>
                        </ListRow>
                      ))}
                    </ListTbody>
                  )}
                </Await>
              </Suspense>
            </ListRoot>
          </ModularBox>
          <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
            <Await promise={subtypePagePromise}>
              {(pages) => (
                <>{pages > 1 && (
                  <ModularBox>
                    <ServerPagination
                      queryKey='subtypePage'
                      page={subtypePage}
                      total={pages} />
                  </ModularBox>)}</>
              )}
            </Await>
          </Suspense>
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
                  queries={['exam']}
                  hiddenFrom='md' />
              </Group>
            </Group>
          </ModularBox>
          <ModularBox>
            <Search query='examSearch' value={examSearch} />
          </ModularBox>
          <ModularBox flex={1}>
            <ListRoot>
              <ListThead>
                <ListTh>
                  <OrderableButton
                    owner='exam'
                    field='name'>
                    <Text>Examen</Text>
                  </OrderableButton>
                </ListTh>
              </ListThead>
              <Suspense fallback={<ListBodySuspense />}>
                <Await promise={examPromise}>
                  {(exam) => (
                    <ListTbody>
                      {exam.map(e => (
                        <ListRow
                          hoverable={true}
                          key={e.id}>
                          <Group justify='space-between' gap={rem(8)} wrap='nowrap'>
                            <Title order={6}>{e.name}</Title>
                            <ActionMenuProvider>
                              <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                  component={Link}
                                  href={`exam/${e.id}/change`}
                                  leftSection={(
                                    <IconExchange style={{ width: rem(16), height: rem(16) }} />
                                  )}>
                                  Cambiar tipo de examen
                                </MenuItem>
                              </ActionMenu>
                            </ActionMenuProvider>
                          </Group>
                        </ListRow>
                      ))}
                    </ListTbody>)}
                </Await>
              </Suspense>
            </ListRoot>
          </ModularBox>
          <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
            <Await promise={examPagePromise}>
              {(pages) => (
                <>{pages > 1 && (
                  <ModularBox>
                    <ServerPagination
                      queryKey='examPage'
                      page={examPage}
                      total={pages} />
                  </ModularBox>)}</>
              )}
            </Await>
          </Suspense>
        </ModularLayout>
      </MultipleLayerSection>
    </MultipleLayerRoot>)
}

export default OmegaLaboratoryExamPage