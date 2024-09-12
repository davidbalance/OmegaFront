'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { Tabs, TabsList, TabsTab } from '@mantine/core'
import { IconCode, IconSitemap, IconTerminal } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface OmegaDeveloperLayoutProps {
    children: React.ReactNode
}
const OmegaDeveloperLayout: React.FC<OmegaDeveloperLayoutProps> = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <Tabs
                color="orange"
                variant="pills"
                onChange={(value) => router.push(`/omega/developer/${value}`)}>
                <ModularBox>
                    <TabsList grow>
                        <TabsTab value="logs" leftSection={<IconCode />}>
                            Logs
                        </TabsTab>
                        <TabsTab value="navigation" leftSection={<IconSitemap />}>
                            Rutas
                        </TabsTab>
                        <TabsTab value="commands" leftSection={<IconTerminal />}>
                            Comandos
                        </TabsTab>
                    </TabsList>
                </ModularBox>
            </Tabs>
            {children}
        </>
    )
}

export default OmegaDeveloperLayout