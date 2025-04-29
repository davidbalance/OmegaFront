import React from 'react'
import ReturnableHeader from '@/components/_base/returnable-header';
import { PatientEmailForm } from '@/components/patient/patient-email-form';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ListRoot from '@/components/_base/list/list-root';
import ListThead from '@/components/_base/list/list-thead';
import ListTh from '@/components/_base/list/list-th';
import { Text } from '@mantine/core';
import { retriveClientEmails } from '@/server';
import EmailList from './_components/email-list';

interface PatientActionEmailPageProps {
  params: { patientDni: string }
}

const PatientActionEmailPage: React.FC<PatientActionEmailPageProps> = async ({
  params
}) => {

  const email = await retriveClientEmails(params.patientDni);

  return (
    <>
      <ReturnableHeader title='Correos electronicos' />
      <ModularBox>
        <PatientEmailForm
          patientDni={params.patientDni}
          emails={email.map(e => e.emailValue)} />
      </ModularBox>
      <ModularBox flex={1}>
        <ListRoot>
          <ListThead>
            <ListTh>
              <Text>Correo electronico</Text>
            </ListTh>
          </ListThead>
          <EmailList email={email} />
        </ListRoot>
      </ModularBox>
    </>
  )
}

export default PatientActionEmailPage;