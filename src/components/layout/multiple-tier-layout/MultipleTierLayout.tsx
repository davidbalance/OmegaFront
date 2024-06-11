import { Header } from '@/components/header/Header';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { ActionIcon, Flex, Title, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import React, { useMemo } from 'react'

export interface TierElement {
    title: string;
    element: React.ReactElement;
}

interface MultipleTierLayoutProps {
    elements: TierElement[];
    tier: number;
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

    const handleCloseTier = () => onClose(tier);

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
    </Flex>, [tier]);

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

export default MultipleTierLayout