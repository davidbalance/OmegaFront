'use client'

import { Header } from '@/components/header/Header'
import MedicalDiseaseReportForm from '@/components/medical/disease/form/MedicalDiseaseReportForm'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { useFetch } from '@/hooks/useFetch'
import { MedicalResultDiseaseReportRequest } from '@/lib/dtos/medical/result/disease/base.request.dto'
import { PostMedicalResultDiseaseReportRequestDto } from '@/lib/dtos/medical/result/disease/request.dto'
import { blobFile } from '@/lib/utils/blob-to-file'
import { notifications } from '@mantine/notifications'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'

const ReportDiseasePage = () => {

  const [shouldRequest, setShouldRequest] = useState<boolean>(false);

  const {
    data: excelData,
    body: excelBody,
    error: excelError,
    loading: excelLoading,
    request: excelRequest,
    reload: excelReload,
    reset: excelReset
  } = useFetch<Blob>('/api/medical/results/diseases/report', 'POST', { loadOnMount: false });

  const handleFormSubmittedEvent = useCallback((data: MedicalResultDiseaseReportRequest) => {
    console.log(data, !data.year && !data.corporativeName && !data.companyRuc)
    if (!data.year && !data.corporativeName && !data.companyRuc) {
      notifications.show({ message: 'Debe colocar al menos un campo de busqueda antes de exportar' })
      return;
    }
    excelRequest<PostMedicalResultDiseaseReportRequestDto>(data);
    setShouldRequest(true);
  }, [excelRequest]);

  useEffect(() => {
    if (excelBody && shouldRequest) {
      excelReload();
      setShouldRequest(false);
    }
  }, [excelBody, shouldRequest, excelReload]);

  useEffect(() => {
    if (excelError) notifications.show({ message: excelError.message, color: 'red' });
  }, [excelError]);

  useEffect(() => {
    if (excelData) {
      blobFile(excelData, `reporte-morbilidades-${dayjs().format('YYYY-MM-DD')}.xlsx`)
      excelReset();
    }
  }, [excelData, excelReset])

  return (
    <ModularLayout>
      <ModularBox>
        <Header text={'Reporte de morbilidades'} />
      </ModularBox>
      <ModularBox>
        <MedicalDiseaseReportForm
          loading={excelLoading}
          onFormSubmitted={handleFormSubmittedEvent} />
      </ModularBox>
    </ModularLayout>
  )
}

export default ReportDiseasePage