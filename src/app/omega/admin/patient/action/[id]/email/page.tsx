import React, { Suspense } from 'react'
import { retriveEmail } from '../../../../../../../server/medical-email.actions';
import ReturnableHeader from '@/components/_base/returnable-header';
import { MedicalClientEmailForm } from '@/components/medical/client/form/medical-client-email-form';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import ListThead from '@/components/_base/list/list-thead';
import Await from '@/components/_base/await';
import ListTh from '@/components/_base/list/list-th';
import { Text } from '@mantine/core';
import MedicalClientEmailListBody from './_components/medical-email-list-body';

interface PatientActionEmailPageProps {
  params: { id: string }
}

const PatientActionEmailPage: React.FC<PatientActionEmailPageProps> = ({
  params
}) => {

  const dni: string = params.id;
  const emailPromise = retriveEmail(dni);

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
          <Suspense fallback={<ListBodySuspense />}>
            <Await promise={emailPromise}>
              {(email) => <MedicalClientEmailListBody email={email} />}
            </Await>
          </Suspense>
        </ListRoot>
      </ModularBox>
    </>
  )
}

export default PatientActionEmailPage;