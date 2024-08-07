'use client'

import { IconSettings, IconLock } from '@tabler/icons-react';
import React, { useState } from 'react'
import classes from './Navbar.module.css';
import cx from 'clsx';
import { ActionIcon, Box, Drawer, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { RESOURCE_KEY } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { NavLinkProp } from '@/lib/types/nav-link.type';
import { NavLink } from './nav/link/NavLink';
import { NavIcon } from './NavIcon';

interface NavbarProps {
    /**
     * Estado que indica que el panel debe encontrarse abierto o cerrado.
     */
    opened: boolean;
    /**
     * Estado que indica si se esta cargando el panel.
     */
    loading?: boolean
    /**
     * Funcion que es invocada cuando se realiza un click en cualquier enlace del panel.
     * @returns 
     */
    onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ opened, onClose }) => {

    const [active, setActive] = useState<string>('');
    const [locked, { toggle }] = useDisclosure(false);
    const match = useMediaQuery('(max-width: 700px)', true, { getInitialValueInEffect: true });
    const [link] = useLocalStorage<NavLinkProp[]>(RESOURCE_KEY, []);

    const mainLinks = link.map((item) => {
        return <NavLink
            opened={opened || locked}
            key={item.label}
            href={item.address}
            active={active}
            link={{
                icon: item.icon ? NavIcon[item.icon] : IconSettings,
                label: item.label
            }}
            onClick={() => {
                setActive(item.label);
                onClose();
            }} />
    });

    return <>
        {
            match
                ? <Drawer
                    opened={opened}
                    onClose={onClose}
                    overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    size='100%'
                    closeButtonProps={{
                        size: 'sm'
                    }}
                >
                    <ScrollArea className={classes.links} h={450}>
                        <Box className={classes.linksInner}>{mainLinks}</Box>
                    </ScrollArea>
                </Drawer>
                : <nav className={(cx(classes.navbar, { [classes.open]: opened || locked }))}>
                    <Box className={classes.links}>
                        <ScrollArea h={475} style={{ direction: 'rtl' }}>
                            <Box className={classes.linksInner}>{mainLinks}</Box>
                        </ScrollArea>
                    </Box>
                    <Box className={cx(classes.lock, { [classes.open]: opened || locked })}>
                        <ActionIcon variant={locked ? 'filled' : 'transparent'} onClick={toggle}>
                            <IconLock />
                        </ActionIcon>
                    </Box>
                </nav>
        }
    </>
}

export { Navbar }