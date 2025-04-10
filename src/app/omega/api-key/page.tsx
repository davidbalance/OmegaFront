import { ModularBox } from '@/components/modular/box/ModularBox'
import React from 'react'
import CreateApiKeyForm from './_components/create_api_key_form'
import ListRoot from '@/components/_base/list/list-root'
import ApiKeyHeader from './_components/api_key_header'
import ApiKeyProvider from './_context/api_key.context'
import { retriveApiKeys } from '@/server'
import ApiKeyList from './_components/api_key_list'
import ApiKeyModal from './_components/api_key_modal'

const OmegaApikey: React.FC = async () => {

  const apikeys = await retriveApiKeys();

  return (
    <>
      <ModularBox>
        <ApiKeyProvider>
          <CreateApiKeyForm />
          <ApiKeyModal />
        </ApiKeyProvider>
      </ModularBox>
      <ModularBox flex={1}>
        <ListRoot>
          <ApiKeyHeader />
          <ApiKeyList apikeys={apikeys} />
        </ListRoot>
      </ModularBox>
    </>
  )
}

export default OmegaApikey