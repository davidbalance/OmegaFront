'use client'

import { ButtonResponsive } from '@/components/button/responsive/ButtonResponsive';
import ExamAction from '@/components/exam/action/ExamAction';
import { ExamSubtypeFormChange } from '@/components/exam/form/ExamSubtypeFormChange';
import ExamSubtypeAction from '@/components/exam/subtype/action/ExamSubtypeAction';
import { ExamSubtypeFormCreate } from '@/components/exam/subtype/form/ExamSubtypeFormCreate';
import { ExamSubtypeFormUpdate } from '@/components/exam/subtype/form/ExamSubtypeFormUpdate';
import { ExamSubtypeTypeFormChange } from '@/components/exam/subtype/form/ExamSubtypeTypeFormChange';
import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto';
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto';
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutState {
  DEFAULT,
  EXAM_SUBTYPE_CREATE,
  EXAM_SUBTYPE_UPDATE,
  EXAM_SUBTYPE_CHANGE_TYPE,
  EXAM_CHANGE_SUBTYPE,
}

const typeColumns: ListElement<ExamType>[] = [
  { key: 'name', name: 'Tipo' },
];

const subtypeColumns: ListElement<ExamSubtype>[] = [
  { key: 'name', name: 'Subtipo' },
];

const examColumns: ListElement<Exam>[] = [
  { key: 'name', name: 'Examen' },
];

const LaboratoryExamPage = () => {

  const [examTypeSelected, setExamTypeSelected] = useState<ExamType | null>(null);
  const [examSubtypeSelected, setExamSubtypeSelected] = useState<ExamSubtype | null>(null);
  const [examSelected, setExamSelected] = useState<Exam | null>(null);
  const [active, setActive] = useState<number>(0);
  const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);

  const {
    data: examTypeData,
    error: examTypeError,
    loading: examTypeLoading,
  } = useFetch<ExamType[]>('/api/exam/types', 'GET');

  const [types, {
    override: overrideTypes,
    update: updateTypes
  }] = useList<ExamType>([]);

  const [subtypes, {
    override: overrideSubtypes,
    append: appendSubtypes,
    update: updateSubtypes,
    remove: removeSubtypes
  }] = useList<ExamSubtype>([]);

  const [exams, {
    override: overrideExams,
    remove: removeExam
  }] = useList<Exam>([]);

  const handleTypeSelection = useCallback((data: ExamType) => {
    overrideSubtypes(data.subtypes);
    overrideExams([]);
    setExamSubtypeSelected(null);
    setExamTypeSelected(data);
    setActive(1);
  }, [overrideSubtypes, overrideExams]);

  const handleExamTypeRow = useCallback((row: ExamType) => (
    <ListRow
      key={row.id}
      active={row.id === examTypeSelected?.id}
      onClick={() => handleTypeSelection(row)}
    >
      <Title order={6}>{row.name}</Title>
    </ListRow>
  ), [handleTypeSelection, examTypeSelected]);

  const handleSubtypeSelection = useCallback((data: ExamSubtype) => {
    overrideExams(data.exams || []);
    setExamSubtypeSelected(data);
    setActive(2);
  }, [overrideExams]);

  const handleDeleteExamSubtypeEvent = useCallback((row: ExamSubtype) => {
    removeSubtypes('id', row.id);
    if (examTypeSelected) {
      const currentSubtypes = examTypeSelected.subtypes.filter(e => e.id !== row.id);
      updateTypes('id', examTypeSelected.id, { subtypes: currentSubtypes });
    }
  }, [removeSubtypes, updateTypes, examTypeSelected]);

  const handleModificationExamSubtypeEvent = useCallback((row: ExamSubtype) => {
    setExamSubtypeSelected(row);
    setCurrentState(LayoutState.EXAM_SUBTYPE_UPDATE)
  }, []);

  const handleSubtypeChangeEventChangeType = useCallback((row: ExamSubtype) => {
    setExamSubtypeSelected(row);
    setCurrentState(LayoutState.EXAM_SUBTYPE_CHANGE_TYPE);
  }, []);

  const handleExamSubtypeRow = useCallback((row: ExamSubtype) => (
    <ListRow
      key={row.id}
      active={row.id === examSubtypeSelected?.id}
      onClick={() => handleSubtypeSelection(row)}
      rightSection={(
        <ExamSubtypeAction
          examSubtype={row}
          onDelete={() => handleDeleteExamSubtypeEvent(row)}
          onModification={() => handleModificationExamSubtypeEvent(row)}
          onChangeExamType={() => handleSubtypeChangeEventChangeType(row)} />
      )}>
      <Text>{row.name}</Text>
    </ListRow>
  ), [examSubtypeSelected, handleSubtypeSelection, handleDeleteExamSubtypeEvent, handleModificationExamSubtypeEvent, handleSubtypeChangeEventChangeType]);

  const handleExamChangeEventChangeSubtype = useCallback((row: Exam) => {
    setExamSelected(row);
    setCurrentState(LayoutState.EXAM_CHANGE_SUBTYPE);
  }, []);

  const handleExamRow = useCallback((row: Exam) => (
    <ListRow
      key={row.id}
      rightSection={(
        <ExamAction
          onChangeExamSubtype={() => handleExamChangeEventChangeSubtype(row)} />
      )}>
      <Text>{row.name}</Text>
    </ListRow>
  ), [handleExamChangeEventChangeSubtype]);

  const handleCreateSubtypeEvent = useCallback(() => {
    setCurrentState(LayoutState.EXAM_SUBTYPE_CREATE);
  }, []);

  const createSubtypeButton = useMemo(() => examTypeSelected
    ? (<ButtonResponsive
      key='create-subype-button'
      label={'Crear subtipo'}
      onClick={handleCreateSubtypeEvent} />)
    : undefined, [examTypeSelected, handleCreateSubtypeEvent]);

  const multipleLayerComponents = useMemo((): TierElement[] => [
    {
      title: 'Tipos',
      element: <ListLayout<ExamType>
        key='exam-type-list-layout'
        loading={examTypeLoading}
        data={types}
        columns={typeColumns}
        rows={handleExamTypeRow}
      />,
    },
    {
      title: 'Subtipos',
      element: <ListLayout<ExamSubtype>
        dock={createSubtypeButton}
        key='exam-subtype-list-layout'
        loading={false}
        data={subtypes}
        columns={subtypeColumns}
        rows={handleExamSubtypeRow}
      />,
    },
    {
      title: 'Examenes',
      element: <ListLayout<Exam>
        key='exam-list-layout'
        loading={false}
        data={exams}
        columns={examColumns}
        rows={handleExamRow}
      />,
    },
  ], [
    createSubtypeButton,
    examTypeLoading,
    types,
    handleExamTypeRow,
    subtypes,
    handleExamSubtypeRow,
    exams,
    handleExamRow
  ]);

  const handleCloseTierEvent = useCallback(() => setActive((prev) => {
    const newValue = prev - 1;
    if (newValue === 0) {
      setExamTypeSelected(null);
    } else if (newValue === 1) {
      setExamSubtypeSelected(null);
    }
    return newValue;
  }), []);

  const handleClickEventClose = useCallback(() => {
    setCurrentState(LayoutState.DEFAULT);
  }, []);

  const handleFormSubmitCreateSubtypeEvent = useCallback((type: number, data: ExamSubtype): void => {
    if (examTypeSelected) {
      appendSubtypes(data);
      updateTypes('id', type, { subtypes: [...subtypes, data] });
      handleClickEventClose();
    }
  }, [
    subtypes,
    examTypeSelected,
    appendSubtypes,
    updateTypes,
    handleClickEventClose
  ]);

  const handleFormSubmitUpdateSubtypeEvent = useCallback((data: ExamSubtype): void => {
    if (examTypeSelected) {
      const currentSubtypes = examTypeSelected.subtypes;
      const currentIndex = currentSubtypes.findIndex(e => e.id === data.id);
      currentSubtypes[currentIndex] = { ...currentSubtypes[currentIndex], ...data };
      updateSubtypes('id', data.id, data);
      updateTypes('id', examTypeSelected.id, { subtypes: currentSubtypes });
      handleClickEventClose();
      setExamSubtypeSelected(null);
    }
  }, [
    examTypeSelected,
    updateTypes,
    updateSubtypes,
    handleClickEventClose
  ]);

  const handleFormSubmitSubtypeChangeTypeEvent = useCallback((newType: number): void => {
    if (examTypeSelected && examSubtypeSelected) {
      if (examTypeSelected.id !== newType) {
        removeSubtypes('id', examSubtypeSelected.id);
        const currentSubtypes = examTypeSelected.subtypes.filter(e => e.id !== examSubtypeSelected.id);
        updateTypes('id', examTypeSelected.id, { subtypes: currentSubtypes });
        const type = types.find(e => e.id === newType);
        if (type) {
          const newSubtypes = type.subtypes;
          newSubtypes.push(examSubtypeSelected);
          updateTypes('id', newType, { subtypes: newSubtypes });
        }
        handleClickEventClose();
        setExamSubtypeSelected(null);
      }
    }
  }, [
    types,
    examTypeSelected,
    examSubtypeSelected,
    handleClickEventClose,
    updateTypes,
    removeSubtypes
  ]);

  const handleFormSubmitExamChangeSubtypeEvent = useCallback((exam: Exam, type: number, subtype: number): void => {
    if (examTypeSelected && examSubtypeSelected) {
      const newType = types.find(e => e.id === type);
      if (newType) {

        if (subtype !== examSubtypeSelected.id) {
          const newSubtype = newType.subtypes.find(e => e.id === subtype);

          if (newSubtype) {
            const newExamArr = [...newSubtype.exams, exam];
            const updatedSubtype = { ...newSubtype, exams: newExamArr };
            // updateSubtypes('id', subtype, { ...newSubtype, exams: newExamArr });
            removeExam('id', exam.id);
            updateSubtypes('id', examSubtypeSelected?.id, { ...examSubtypeSelected, exams: exams.filter(e => e.id !== exam.id) });

            const newSubtypeArr = newType.subtypes.map(e => e.id === newSubtype.id ? updatedSubtype : e);
            const updatedType = { ...newType, subtypes: newSubtypeArr };
            updateTypes('id', type, updatedType);
            if (newType.id === examTypeSelected.id) {
              updateSubtypes('id', subtype, updatedSubtype);
            }

            setCurrentState(LayoutState.DEFAULT);
          }
        }
      }
    }
  }, [
    types,
    exams,
    examTypeSelected,
    examSubtypeSelected,
    updateSubtypes,
    updateTypes,
    removeExam
  ]);

  const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
    [LayoutState.DEFAULT]: (
      <MultipleTierLayout
        elements={multipleLayerComponents}
        tier={active}
        onClose={handleCloseTierEvent}
      />),
    [LayoutState.EXAM_SUBTYPE_CREATE]: (
      <ExamSubtypeFormCreate
        type={examTypeSelected?.id || 0}
        onClose={handleClickEventClose}
        onFormSubmit={handleFormSubmitCreateSubtypeEvent} />
    ),
    [LayoutState.EXAM_SUBTYPE_UPDATE]: (
      <ExamSubtypeFormUpdate
        type={examTypeSelected?.id || 0}
        examSubtype={examSubtypeSelected!}
        onClose={handleClickEventClose}
        onFormSubmit={handleFormSubmitUpdateSubtypeEvent} />
    ),
    [LayoutState.EXAM_SUBTYPE_CHANGE_TYPE]: (
      <ExamSubtypeTypeFormChange
        type={examTypeSelected?.id!}
        examSubtype={examSubtypeSelected!}
        types={types}
        onClose={handleClickEventClose}
        onFormSubmit={handleFormSubmitSubtypeChangeTypeEvent} />
    ),
    [LayoutState.EXAM_CHANGE_SUBTYPE]: (
      <ExamSubtypeFormChange
        type={examTypeSelected?.id!}
        subtype={examSubtypeSelected?.id!}
        exam={examSelected!}
        types={types}
        onClose={handleClickEventClose}
        onFormSubmit={handleFormSubmitExamChangeSubtypeEvent} />
    ),
  }), [
    multipleLayerComponents,
    examSelected,
    active,
    types,
    examTypeSelected,
    examSubtypeSelected,
    handleCloseTierEvent,
    handleClickEventClose,
    handleFormSubmitCreateSubtypeEvent,
    handleFormSubmitUpdateSubtypeEvent,
    handleFormSubmitSubtypeChangeTypeEvent,
    handleFormSubmitExamChangeSubtypeEvent
  ]);

  useEffect(() => {
    if (examTypeData) overrideTypes(examTypeData);
  }, [examTypeData, overrideTypes]);

  useEffect(() => {
    if (examTypeError) notifications.show({ message: examTypeError.message, color: 'red' });
  }, [examTypeError]);

  return (<>{view[currentState]}</>)
}

export default LaboratoryExamPage