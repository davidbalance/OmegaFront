import React from 'react'
import ReportForm from '../report-form/ReportForm'
import { Drawer, DrawerProps, LoadingOverlay } from '@mantine/core'
import endpoints from '@/services/endpoints/endpoints';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { MedicalResult as MedicalResultType, MedicalResultReport as MedicalResultReportType } from '@/services/api/medical-result/dtos';
import { MedicalResultService } from '@/services/api';

const resultService = new MedicalResultService(endpoints.RESULT.V1);

type ReportFormDrawerProps = DrawerProps & {
  result: number;
  report?: MedicalResultReportType;
  onFormSubmit: (data: MedicalResultType) => void;
};
const ReportFormDrawer: React.FC<ReportFormDrawerProps> = ({ result, report, onFormSubmit, ...props }) => {

  const [visible, LoadDisclosure] = useDisclosure(false);

  const handleSubmitContent = async (content: string) => {
    if (result <= 0) {
      notifications.show({
        title: 'Error',
        message: 'Se ha producido un error al guardar el reporte',
        color: 'red'
      });
      return;
    }
    LoadDisclosure.open();
    try {
      const newResult = await resultService.findOneAndInsertReport({ id: result, content });
      onFormSubmit(newResult);
      props.onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Se ha producido un error al guardar el reporte',
        color: 'red'
      });
    } finally {
      LoadDisclosure.close();
    }
  }

  return (
    <Drawer
      position='right'
      title='Ingreso de reporte medico'
      size='100%'
      keepMounted={false}
      {...props}>

      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />


      <ReportForm
        content={report?.content}
        onSubmit={handleSubmitContent}
      />
    </Drawer>
  )
}

export default ReportFormDrawer