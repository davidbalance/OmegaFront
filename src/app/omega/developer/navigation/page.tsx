import React from 'react'
import ListRoot from '@/components/_base/list/list-root';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Button, rem } from '@mantine/core';
import Link from 'next/link';
import { retriveResources } from '@/server/resource/actions';
import ResourceList from './_components/resource_list';

const DeveloperNavigationPage: React.FC = async () => {

  const resources = await retriveResources();
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
        <ResourceList resources={resources} />
      </ListRoot>
    </ModularBox>)
}

export default DeveloperNavigationPage