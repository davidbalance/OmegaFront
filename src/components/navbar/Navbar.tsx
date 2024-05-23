'use client'

import { Box, Burger, Drawer, Flex, Grid, ScrollArea, rem, useMantineTheme } from '@mantine/core';
import { IconProps, Icon, IconUsers, IconStethoscope, IconWheelchair, IconLicense, IconFolder, IconFolders, IconReportMedical, IconSettings, IconMapPin, IconKey } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import classes from './Navbar.module.css';
import { NavLink } from './navlink/NavLink';
import { NavFooter } from './navfooter/NavFooter';
import { NavLogo } from './navlogo/NavLogo';
import { useSearch } from '@/hooks/useSearch';
import { NavLinkProp } from '@/lib/types/nav-link.type';
import { SearchInputText } from '../input/SearchInputText';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

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
    links: NavLinkProp[],
    logo: string,
    loading?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ links, logo }) => {

    const [active, setActive] = useState<string>('');
    const search = useSearch(links, ['label']);

    const matches = useMediaQuery('(min-width: 700px)');

    const [burgerState, BurgerDisclosure] = useDisclosure(false);

    const mainLinks = search.filter.map((item) => {
        return <NavLink
            key={item.label}
            href={item.address}
            active={active === item.label}
            link={{
                icon: item.icon ? LinkIcon[item.icon] : IconSettings,
                label: item.label
            }}
            onClick={() => {
                setActive(item.label);
                BurgerDisclosure.close();
            }} />
    });

    return <>
        <nav className={classes.navbar}>
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
        </nav>
        {
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
        }
    </>
}

export { Navbar }