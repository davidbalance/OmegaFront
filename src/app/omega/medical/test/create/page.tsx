import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import LaboratoryRoot from './_components/laboratory_root';
import LaboratoryForm from './_components/laboratory_form';
import { retriveExamTypesOptions } from '@/server';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { retriveMedicalTests } from '@/server';
import LaboratoryList from './_components/laboratory_list';

interface MedicalTestCreateProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
const MedicalTestCreatePage: React.FC<MedicalTestCreateProps> = async ({
  searchParams
}) => {

  const orderId = typeof searchParams.orderId === 'string' ? searchParams.orderId : undefined;

  if (!orderId) {
    return <>
      <ReturnableHeader title='Orden medica no escogida' />
    </>
  }

  const options = await retriveExamTypesOptions();
  const tests = await retriveMedicalTests({ orderId });
  
  return (
    <>
      <ReturnableHeader title='Gestion de pruebas medicas' />
      <LaboratoryRoot>
        <ModularBox>
          <LaboratoryForm
            tests={tests}
            options={options}
            orderId={orderId} />
        </ModularBox>
        <ModularBox>
          <LaboratoryList tests={tests} />
        </ModularBox>
      </LaboratoryRoot >
      {/* <MedicalOrderLaboratoryRoot>
      <MedicalOrderLaboratoryForm options={labOptions} />
      <MedicalOrderLaboratoryList />
    </MedicalOrderLaboratoryRoot> */}
    </>
  )
}

export default MedicalTestCreatePage