import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import ApikeyForm from './_components/apikey-form'
import ListRoot from '@/components/_base/list/list-root'
import ApikeyHeader from './_components/apikey-header'
import ApikeyListBody from './_components/apikey-list-body'
import { retriveApikeys } from '@/server/api-key.actions'
import ApikeyProvider from './_components/apikey.context'
import ApikeyModal from './_components/api-key-modal'

const OmegaApikey: React.FC = async () => {

  const apikeys = await retriveApikeys();

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
          <ApikeyListBody apikeys={apikeys} />
        </ListRoot>
      </ModularBox>
    </>
  )
}

export default OmegaApikey