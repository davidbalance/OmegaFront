import { ModularBox } from '@/components/modular/box/ModularBox'
import React, { Suspense } from 'react'
import ApikeyForm from './_components/apikey-form'
import ListRoot from '@/components/_base/list/list-root'
import ApikeyHeader from './_components/apikey-header'
import ListBodySuspense from '@/components/_base/list/list-body.suspense'
import Await from '@/components/_base/await'
import ApikeyListBody from './_components/apikey-list-body'
import { retriveApikeys } from '@/server/api-key.actions'
import ApikeyProvider from './_components/apikey.context'
import ApikeyModal from './_components/api-key-modal'

const OmegaApikey: React.FC = () => {

  const apikeyPromise = retriveApikeys();

  return (
    <>
      <ModularBox>
        <ApikeyProvider>
          <ApikeyForm />
          <ApikeyModal />
        </ApikeyProvider>
      </ModularBox>
      <ModularBox flex={1}>
        <ListRoot>
          <ApikeyHeader />
          <Suspense fallback={<ListBodySuspense />}>
            <Await promise={apikeyPromise}>
              {(apikeys) => <ApikeyListBody apikeys={apikeys} />}
            </Await>
          </Suspense>
        </ListRoot>
      </ModularBox>
    </>
  )
}

export default OmegaApikey