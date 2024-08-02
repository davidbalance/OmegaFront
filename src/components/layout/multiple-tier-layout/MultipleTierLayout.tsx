import { Header } from '@/components/header/Header';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { ActionIcon, Flex, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import React, { useCallback, useMemo } from 'react'

export interface TierElement {
    title: string;
    element: React.ReactElement;
}

interface MultipleTierLayoutProps {
    /**
     * Elementos que seran renderizados en cada subpagina.
     */
    elements: TierElement[];
    /**
     * Pagina actual activa.
     */
    tier: number;
    /**
     * Funcion que es invocada cuando se llama al cierre de cada pagina.
     * @param index 
     * @returns 
     */
    onClose: (index: number) => void;
}
const MultipleTierLayout: React.FC<MultipleTierLayoutProps> = ({ elements, tier, onClose }) => {
    if (elements.length > 3) {
        throw new Error('You can only set at least 3 children');
    }

    if (tier > elements.length || tier < 0) {
        throw new Error('Tier is out of bounds');
    }

    const isMobile = useMediaQuery('(max-width: 50em)');

    const handleCloseTier = useCallback(() => onClose(tier), [onClose, tier]);

    const mobileTier = useMemo(() => <Flex direction='column' gap={8} w='100%'>
        <ModularBox>
            <Flex w='100%' justify='space-between'>
                <Header text={elements[tier].title} />
                {
                    tier > 0 && <ActionIcon size='xs' radius='xl' p={rem(2)} onClick={handleCloseTier}>
                        <IconX />
                    </ActionIcon>
                }
            </Flex>
        </ModularBox>
        {elements[tier].element}
    </Flex>, [tier, elements, handleCloseTier]);

    const multipleChildrenTier = useMemo(() => elements.map((e, index) => (
        <Flex direction='column' gap={8} key={index} w='100%'>
            <ModularBox>
                <Header text={e.title} />
            </ModularBox>
            {e.element}
        </Flex>
    )), [elements]);

    return (
        <Flex direction='row' h='100%' gap={8}>
            {isMobile
                ? mobileTier
                : multipleChildrenTier
            }
        </Flex>
    )
}

MultipleTierLayout.displayName = 'MultipleTierLayout';

export { MultipleTierLayout }