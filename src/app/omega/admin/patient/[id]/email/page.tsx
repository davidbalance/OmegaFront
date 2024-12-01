import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header';
import { MedicalClientEmailForm } from '@/components/medical-client-email-form';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ListRoot from '@/components/_base/list/list-root';
import ListThead from '@/components/_base/list/list-thead';
import ListTh from '@/components/_base/list/list-th';
import { Text } from '@mantine/core';
import { retriveMedicalClientEmail } from '@/server/medical-email.actions';
import MedicalClientEmailListBody from './_components/medical-email-list-body';

interface PatientActionEmailPageProps {
  params: { id: string }
}

const PatientActionEmailPage: React.FC<PatientActionEmailPageProps> = async ({
  params
}) => {

  const dni: string = params.id;
  const email = await retriveMedicalClientEmail(dni);

  return (
    <>
      <ReturnableHeader title='Correos electronicos' />
      <ModularBox>
        <MedicalClientEmailForm dni={dni} />
      </ModularBox>
      <ModularBox flex={1}>
        <ListRoot>
          <ListThead>
            <ListTh>
              <Text>Correo electronico</Text>
            </ListTh>
          </ListThead>
          <MedicalClientEmailListBody email={email} />
        </ListRoot>
      </ModularBox>
    </>
  )
}

export default PatientActionEmailPage;