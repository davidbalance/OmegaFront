'use client'

import { IconProps, Icon, IconUsers, IconStethoscope, IconWheelchair, IconLicense, IconFolder, IconFolders, IconReportMedical, IconSettings, IconMapPin, IconKey, IconLock } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import classes from './Navbar.module.css';
import { NavLink } from './navlink/NavLink';
import { useSearch } from '@/hooks/useSearch';
import { NavLinkProp } from '@/lib/types/nav-link.type';
import cx from 'clsx';
import { ActionIcon, Box, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const LinkIcon: Record<string, ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>> = {
    "user": IconUsers,
    "patient": IconWheelchair,
    "doctor": IconStethoscope,
    "role": IconLicense,
    "morbidity": IconFolder,
    "morbidity-group": IconFolders,
    "report": IconReportMedical,
    "location": IconMapPin,
    "key": IconKey,
}

interface NavbarProps {
    opened: boolean;
    onClose: () => void;
    links: NavLinkProp[],
    logo: string,
    loading?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ opened, onClose, links }) => {

    const [active, setActive] = useState<string>('');
    const search = useSearch(links, ['label']);

    const [locked, { toggle }] = useDisclosure(false);

    const mainLinks = search.filter.map((item) => {
        return <NavLink
            opened={opened || locked}
            key={item.label}
            href={item.address}
            active={active}
            link={{
                icon: item.icon ? LinkIcon[item.icon] : IconSettings,
                label: item.label
            }}
            onClick={() => {
                setActive(item.label);
                onClose();
            }} />
    });

    return <>
        {/* <Drawer
            opened={opened}
            onClose={onClose}
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            size='100%'
            closeButtonProps={{
                size: 'sm'
            }}
        >
            <ScrollArea className={classes.links} h={450} scrollbarSize={2}>
                <div className={classes.linksInner}>{mainLinks}</div>
            </ScrollArea>
        </Drawer> */}
        <nav className={(cx(classes.navbar, { [classes.open]: opened || locked }))}>
            <ScrollArea className={classes.links} h={450} scrollbarSize={2}>
                <div className={classes.linksInner}>{mainLinks}</div>
            </ScrollArea>
            <Box className={cx(classes.lock, { [classes.open]: opened || locked })}>
                <ActionIcon variant={locked ? 'filled' : 'transparent'} onClick={toggle}>
                    <IconLock />
                </ActionIcon>
            </Box>
        </nav>
        {/* <nav className={classes.navbar}>
            <div className={classes.header}>
                <Grid py={rem(4)} px={rem(8)}>
                    <Grid.Col span={!matches ? 3 : 1}>
                        {
                            !matches &&
                            <Flex justify='flex-start' align='center' style={{ width: '100%' }}>
                                <Burger
                                    size="xs"
                                    opened={burgerState}
                                    onClick={BurgerDisclosure.toggle}
                                    aria-label="Toggle navigation" />
                            </Flex>
                        }
                    </Grid.Col>
                    <Grid.Col span={!matches ? 6 : 10}>
                        <Flex justify='center' align='center' style={{ width: '100%' }}>
                            <NavLogo logo={logo} />
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={!matches ? 3 : 1}></Grid.Col>
                </Grid>
            </div>

            {
                matches && <>
                    <ScrollArea className={classes.links}>
                        <SearchInputText
                            className={classes.search}
                            onChange={(e) => search.onSearch(e.target.value)}
                            placeholder="Buscar"
                            style={{ position: 'sticky', top: 0 }} />
                        <div className={classes.linksInner}>{mainLinks}</div>
                    </ScrollArea>
                    <div className={classes.footer}>
                        <NavFooter />
                    </div>
                </>
            }
        </nav> */}
        {/*  {
            !matches &&
            <Drawer
                opened={burgerState}
                onClose={BurgerDisclosure.close}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                size='100%'
            >
                <ScrollArea className={classes.links} h={400}>
                    <SearchInputText
                        className={classes.search}
                        onChange={(e) => search.onSearch(e.target.value)}
                        placeholder="Buscar"
                        style={{ position: 'sticky', top: 0 }} />
                    <div className={classes.linksInner}>{mainLinks}</div>
                </ScrollArea>
                <div className={classes.footer}>
                    <NavFooter />
                </div>
            </Drawer>
        } */}
    </>
}

export { Navbar }