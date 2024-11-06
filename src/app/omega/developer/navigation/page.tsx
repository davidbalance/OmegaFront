import { retriveWebResources } from '@/server/web-resource.actions'
import React from 'react'
import WebResourceListBody from './_components/web-resource-list-body';
import ListRoot from '@/components/_base/list/list-root';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Button, rem } from '@mantine/core';
import Link from 'next/link';

const OmegaDeveloperNavigationPage: React.FC = async () => {

  const resources = await retriveWebResources();

  return (
    <ModularBox flex={1}>
      <Button
        component={Link}
        fullWidth
        href='navigation/create'
        size='xs'
        style={{ marginBottom: rem(4) }}>
        Crear recurso
      </Button>
      <ListRoot>
        <WebResourceListBody resources={resources} />
      </ListRoot>
    </ModularBox>)
}

export default OmegaDeveloperNavigationPage