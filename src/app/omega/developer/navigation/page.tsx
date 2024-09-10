import Await from '@/components/_base/await';
import { retriveWebResources } from '@/server/web-resource.actions'
import React, { Suspense } from 'react'
import WebResourceListBody from './_components/web-resource-list-body';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Button } from '@mantine/core';
import Link from 'next/link';

const OmegaDeveloperNavigationPage: React.FC = () => {

  const resourcePromise = retriveWebResources();

  return (
    <ModularBox flex={1}>
      <Button
        component={Link}
        href='navigation/create'
        size='xs'>
        Crear recurso
      </Button>
      <ListRoot>
        <Suspense fallback={<ListBodySuspense />}>
          <Await promise={resourcePromise}>
            {(value) => <WebResourceListBody resources={value} />}
          </Await>
        </Suspense>
      </ListRoot>
    </ModularBox>)
}

export default OmegaDeveloperNavigationPage