'use client'

import ModularLayout from '@/components/modular/layout/ModularLayout'
import { UnstyledButton, FloatingIndicator, Flex, rem } from '@mantine/core';
import React, { useMemo, useState } from 'react'
import classes from './developer.page.module.css';
import { DeveloperLogs } from '@/components/developer/logs/DeveloperLogs';
<<<<<<< HEAD
import DeveloperPages from '@/components/developer/pages/DeveloperPages';
import DeveloperReport from '@/components/developer/report/DeveloperReport';

const data = ['Logs', 'Paginas', 'Reportes Globales'];
const layouts = [DeveloperLogs, DeveloperPages, DeveloperReport];
=======
import { DeveloperPages } from '@/components/developer/pages/DeveloperPages';
import { DeveloperCommands } from '@/components/developer/commands/DeveloperCommands';

const data = ['Logs', 'Paginas', 'Comandos'];
const layouts = [DeveloperLogs, DeveloperPages, DeveloperCommands];
>>>>>>> b1959bc12ea66851ccc58f016382bc50fedd14c8

const DeveloperPage = () => {

    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
<<<<<<< HEAD
    const [active, setActive] = useState(0);
=======
    const [active, setActive] = useState(2);
>>>>>>> b1959bc12ea66851ccc58f016382bc50fedd14c8

    const setControlRef = (index: number) => (node: HTMLButtonElement) => {
        controlsRefs[index] = node;
        setControlsRefs(controlsRefs);
    };

    const controls = data.map((item, index) => (
        <UnstyledButton
            key={item}
            className={classes.control}
            ref={setControlRef(index)}
            onClick={() => setActive(index)}
            mod={{ active: active === index }}
        >
            <span className={classes.controlLabel}>{item}</span>
        </UnstyledButton>
    ));

    const CurrentLayout = useMemo(() => layouts[active], [active]);

    return (
        <ModularLayout>
            <Flex
                justify='center'
                align='center'
                className={classes.root}
                ref={setRootRef}
                gap={rem(12)}>
                {controls}

                <FloatingIndicator
                    target={controlsRefs[active]}
                    parent={rootRef}
                    className={classes.indicator}
                />
            </Flex>
            <CurrentLayout />
        </ModularLayout>
    )
}

export default DeveloperPage