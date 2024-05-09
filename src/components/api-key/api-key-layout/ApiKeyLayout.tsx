import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { Role } from '@/services/api/role/dtos';
import { Table, TextInput, rem } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';
import React, { use, useEffect } from 'react'

type RoleLayoutProps = {
    load: boolean;
    events: {
        onCreate: () => void;
    }
}

const ApiKeyLayout: React.FC<RoleLayoutProps> = ({ events, load }) => {

    const header = <>
        <OmegaTh> Nombre de la ApiKey </OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    return (
    <>
        <Header
            button={{
                icon: IconCirclePlus,
                onClick: events.onCreate,
                show: true
            }}>
            Apikeys registradas
        </Header>

        <TextInput
            placeholder="Buscar"
            size="xs"
            leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
            rightSectionWidth={70}
            styles={{ section: { pointerEvents: 'none' } }}
            mb="sm"
        />

    </>
    );

}

export { ApiKeyLayout }